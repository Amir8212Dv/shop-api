import productModel from "../../../models/products.js"
import autobind from 'auto-bind'
import { createProductValidationSchema , updateProductValidationSchema } from "../../../validators/admin/product.js"
import createHttpError from "http-errors"
import createImageLink from "../../../utils/createImageLink.js"
import stringToArray from "../../../utils/stringToArray.js"
import httpStatus from 'http-status-codes'



// add remove image method
// add sorting for get products






class productController {
    #aggregateScheam = []
    constructor() {
        autobind(this)
    }


    async addProduct(req , res , next) {
        try {
            const files = req.files || []

            
            req.body.images = files.map(item => item.path.split('public')[1].replaceAll('\\' , '/'))
            
            if(typeof req.body.features === 'string') req.body.features = JSON.parse(req.body.features)
            req.body.tags = stringToArray(req.body.tags) // swagger sends arrays in format: "item1,item2,item3"

            await createProductValidationSchema.validateAsync(req.body)

            const product = await productModel.create({...req.body , suplier : req.user._id})
            if(!product) throw createHttpError.InternalServerError('add product faild')

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'product added successfully',
                data : {
                    product : [
                        product
                    ]
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    // async addImage(req , res , next) {
    //     try {
    
    //         const product = await productModel.findById(req.params.id )
            
    //         paths.forEach(item => {
    //             if(!(product.images.includes(item))) product.images.push(item)
    //         })
    //         await product.save()

    //         res.status(httpStatus.CREATED).send({
    //             status : httpStatus.CREATED,
    //             message : 'images added to product successfully',
    //             data : {
    //                 images : product.images.map(image => createImageLink(req , image))
    //             }
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    async editProduct(req , res , next) {
        try {
            const data = req.body

            if(typeof data.features === 'string') data.features = JSON.parse(data.features)
            if(typeof data.tags === 'string') data.tags = stringToArray(data.tags) // swagger sends arrays in format: "item1,item2,item3"
            else if(!!data.tags) data.tags = data.tags.map(tag => tag.trim())

            await updateProductValidationSchema.validateAsync(data)

            const product = await productModel.findByIdAndUpdate(req.params.id , data , {returnDocument : 'after'})
            if(!product) throw createHttpError.BadRequest('product not found')

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'product edited successfully',
                data : {
                    product : [
                        product
                    ]
                }
            })
        } catch (error) {
            next(error)
        }
    } 
    async getAllProducts(req , res , next) {
        try {

            // const searchFilter = req.query.search ? {$text : {$search : req.query.search}} : {}

            const products = await productModel.find({ ...(req.query.search && {$text : {$search : req.query.search}}) })

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    product : products
                }
            })
            
        } catch (error) {
            next(error)
        }
    } 
    async getProductById(req , res , next) {
        try {

            const product = await productModel.findById(req.params.id)
            if(!product) throw createHttpError.BadRequest('product not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    product : [
                        product
                    ]
                }
            })
            
        } catch (error) {
            next(error)
        }
    } 

    async removeProduct(req , res , next) {
        try {
            const id = req.params.id 
            
            const deletedProduct = await productModel.findByIdAndDelete(id)

            if(!deletedProduct) throw createHttpError.BadRequest('product not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'product deleted successfully',
                data : {
                    product : [
                        deletedProduct
                    ]
                }
            })
            
        } catch (error) {
            next(error)
        }
    } 

}

export default new productController()