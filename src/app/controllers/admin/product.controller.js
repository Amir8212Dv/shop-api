import productModel from "../../models/products.js"
import autobind from 'auto-bind'
import productSchema from "../../validators/admin/product.js"
import createHttpError from "http-errors"

class productController {
    #aggregateScheam = []
    constructor() {
        autobind(this)
    }


    async addProduct(req , res , next) {
        try {
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
    async editProduct(req , res , next) {
        try {
            
        } catch (error) {
            next(error)
        }
    } 
    async getAllProducts(req , res , next) {
        try {
            
        } catch (error) {
            next(error)
        }
    } 
    async getProductById(req , res , next) {
        try {
            
        } catch (error) {
            next(error)
        }
    } 
    async get(req , res , next) {
        try {
            
        } catch (error) {
            next(error)
        }
    } 
    async removeProduct(req , res , next) {
        try {
            
        } catch (error) {
            next(error)
        }
    } 

}

export default new productController()