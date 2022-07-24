import productModel from "../../../models/products.js"
import { createProductValidationSchema , updateProductValidationSchema } from "../../../validators/admin/product.js"
import stringToArray from "../../../utils/stringToArray.js"
import httpStatus from 'http-status-codes'
import validateObjectId from "../../../validators/objectId.js"
import basketModel from "../../../models/basket.js"
import { createInternalServerError, createNotFoundError } from "../../../utils/createError.js"



class ProductController {

    async createProduct(req , res , next) {
        try {
            const files = req.files || []
            
            req.body.images = files.map(item => item.path.split('public')[1].replaceAll('\\' , '/'))
            
            if(typeof req.body.features === 'string') req.body.features = JSON.parse(req.body.features)
            req.body.tags = stringToArray(req.body.tags) // swagger sends arrays in format: "item1,item2,item3"

            await createProductValidationSchema.validateAsync(req.body)

            const product = await productModel.create({...req.body , suplier : req.user._id})
            createInternalServerError(product)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'product added successfully',
                data : {
                    product
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async editProduct(req , res , next) {
        try {
            const updateData = req.body
    
            const {productId} = req.params
            await validateObjectId.validateAsync(productId)
    
            
            if(typeof updateData.features === 'string') updateData.features = JSON.parse(updateData.features)
            stringToArray(updateData.tags) // swagger sends arrays in format: "item1,item2,item3"
            
    
            await updateProductValidationSchema.validateAsync(updateData)
    
            const {price : oldPrice , discount : oldDiscount} = await productModel.findById(productId , {price : 1 , discount : 1})
            
            
            const product = await productModel.findByIdAndUpdate(productId ,updateData , {returnDocument : 'after'})
            createNotFoundError({product})

            // updates users basket info
            if(updateData.price || updateData.discount) {
                const oldTotalPrice = oldPrice - oldDiscount
                const newTotalPrice = product.price - product.discount
        
                const baskets = await basketModel.find({'products.productId' : productId})
                baskets.forEach(basket => {
                    const basketProduct = basket.products.find(item => item.productId.toString() === productId)
                    basket.totalPrice +=  basketProduct.count * (newTotalPrice - oldTotalPrice)
                    basket.save()
                })
            }
                
        
            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'product edited successfully',
                data : {}
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteProduct(req , res , next) {
        try {
            const {productId} = req.params
    
            const product = await productModel.findById(productId)
            createNotFoundError({product})
            const deleteProduct = await productModel.deleteOne({_id : productId})
            createInternalServerError(deleteProduct.deletedCount)
            
            deleteFile(path.join(process.argv[1] , '..' , '..' , 'public' , productId))

            // updates users basket info
            const totalPrice = product.price - product.discount
            const baskets = await basketModel.find({'products.productId' : productId})
            baskets.forEach(basket => {
                const productCount = basket.products.find(item => item.productId.toString() === productId).count
                basket.products = basket.products.filter(item => item.productId.toString() !== productId)

                basket.totalPrice -=  productCount * totalPrice
                basket.save()                
            })


            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'product deleted successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    } 
}

export default new ProductController()