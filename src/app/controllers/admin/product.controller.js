import productModel from "../../models/products.js"
import autobind from 'auto-bind'
import productSchema from "../../validators/admin/product.js"
import createHttpError from "http-errors"
import createImageLink from "../../utils/createImageLink.js"
import stringToArray from "../../utils/stringToArray.js"




// add remove image method
// add sorting for get products






class productController {
    #aggregateScheam = []
    constructor() {
        autobind(this)
    }


    async addProduct(req , res , next) {
        try {
            if(typeof req.body.features === 'string') req.body.features = JSON.parse(req.body.features)
            req.body.tags = stringToArray(req.body.tags) // swagger sends arrays in format: "item1,item2,item3"

            await productSchema.validateAsync(req.body)

            const product = await productModel.create({...req.body , suplier : req.user._id})
            if(!product) throw createHttpError.InternalServerError('add product faild')

            res.status(201).send({
                status : 201,
                product
            })
            
        } catch (error) {
            next(error)
        }
    }
    async addImage(req , res , next) {
        try {
            const files = req.files || []
            const paths = files.map(item => item.path.split('public')[1].replaceAll('\\' , '/'))
    
            const product = await productModel.findById(req.params.id )
            
            paths.forEach(item => {
                if(!(product.images.includes(item))) product.images.push(item)
            })
            await product.save()

            res.status(201).send({
                status : 201,
                images : product.images.map(image => createImageLink(req , image))
            })
        } catch (error) {
            next(error)
        }
    }

    async editProduct(req , res , next) {
        try {
            const data = req.body

            if(typeof data.features === 'string') data.features = JSON.parse(data.features)
            if(typeof data.tags === 'string') data.tags = stringToArray(data.tags) // swagger sends arrays in format: "item1,item2,item3"
            else if(!!data.tags) data.tags = data.tags.map(tag => tag.trim())

            await productSchema.validateAsync(data)

            const product = await productModel.findByIdAndUpdate(req.params.id , data , {returnDocument : 'after'})
            if(!product) throw createHttpError.BadRequest('product not found')

            res.status(201).send({
                status : 201,
                product
            })
        } catch (error) {
            next(error)
        }
    } 
    async getAllProducts(req , res , next) {
        try {

            const searchFilter = req.query.search ? {$text : {$search : req.query.search}} : {}

            const products = await productModel.find(searchFilter)

            res.send({
                status : 200,
                products
            })
            
        } catch (error) {
            next(error)
        }
    } 
    async getProductById(req , res , next) {
        try {

            const product = await productModel.findById(req.params.id)
            if(!product) throw createHttpError.BadRequest('product not found')

            res.send({
                status : 200,
                product
            })
            
        } catch (error) {
            next(error)
        }
    } 

    async removeProduct(req , res , next) {
        try {
            const id = req.params.id 
            
            const product = await productModel.findByIdAndDelete(id)

            if(!product) throw createHttpError.BadRequest('product not found')

            res.send({
                status : 200,
                message : 'product deleted successfully'
            })
            
        } catch (error) {
            next(error)
        }
    } 

}

export default new productController()