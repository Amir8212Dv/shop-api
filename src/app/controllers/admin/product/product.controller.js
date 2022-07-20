import productModel from "../../../models/products.js"
import autobind from 'auto-bind'
import { createProductValidationSchema , updateProductValidationSchema } from "../../../validators/admin/product.js"
import createHttpError from "http-errors"
import createImageLink from "../../../utils/createImageLink.js"
import stringToArray from "../../../utils/stringToArray.js"
import httpStatus from 'http-status-codes'
import validateObjectId from "../../../validators/objectId.js"



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


    async editProduct(req , res , next) {
        try {
            const data = req.body
            const {productId} = req.params
            await validateObjectId.validateAsync(productId)

            if(typeof data.features === 'string') data.features = JSON.parse(data.features)
            stringToArray(data.tags) // swagger sends arrays in format: "item1,item2,item3"

            await updateProductValidationSchema.validateAsync(data)

            const product = await productModel.findByIdAndUpdate(productId , data , {returnDocument : 'after'})

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
    // async getAllProducts(req , res , next) {
    //     try {

    //         // const searchFilter = req.query.search ? {$text : {$search : req.query.search}} : {}

    //         const products = await productModel.find({ ...(req.query.search && {$text : {$search : req.query.search}}) })

    //         res.status(httpStatus.OK).send({
    //             status : httpStatus.OK,
    //             message : '',
    //             data : {
    //                 product : products
    //             }
    //         })
            
    //     } catch (error) {
    //         next(error)
    //     }
    // } 
    // async getProductById(req , res , next) {
    //     try {
    //         const {productId} = req.params
    //         await validateObjectId.validateAsync(productId)

    //         const product = await productModel.findById(productId)
    //         if(!product) throw createHttpError.NotFound('product not found')

    //         res.status(httpStatus.OK).send({
    //             status : httpStatus.OK,
    //             message : '',
    //             data : {
    //                 product : [
    //                     product
    //                 ]
    //             }
    //         })
            
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    async removeProduct(req , res , next) {
        try {
            const {productId} = req.params
            
            const product = await productModel.findByIdAndDelete(productId)

            createNotFoundError({product})

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

export default new productController()