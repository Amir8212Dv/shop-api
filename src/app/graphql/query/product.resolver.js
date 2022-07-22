import productType from "../types/product.type.js";
import {GraphQLObjectType , GraphQLList , GraphQLString, GraphQLInt} from 'graphql'
import productModel from '../../models/products.js'
import createQueryFilter from "../../utils/createQueryFilter.js";
import createResponseType from "../types/responseType.js";
import httpStatus from 'http-status-codes'
import Controller from "../../controllers/controller.js";
import mongoose from "mongoose";

const responseType = {
    products : {type : new GraphQLList(productType)}
}

class productQuery extends Controller {

    #aggregateSchema = [
        this.categoryLookup('category'),
        ...this.userLookup('suplier'),
    ]
    getAllProducts = {
        type : createResponseType(responseType),
        args : {
            suplier : {type : GraphQLString},
            search : {type : GraphQLString},
            tags : {type : GraphQLString},
            category : {type : GraphQLString},
            discount : {type : GraphQLString},
            price : {type : GraphQLString},
            sort : {type : GraphQLString},
            page : {type : GraphQLInt},
            pageLimit : {type : GraphQLInt}
        },
        resolve : async (obj , args , context , info) => {

            const queryFilter = createQueryFilter(args)
            const {page , pageLimit , sort} = args

            const products = await productModel.aggregate([
                {$match : queryFilter},
                ...this.#aggregateSchema,
                {
                    $sort : {
                        [sort] : 1
                    }
                },
                {
                    $limit : pageLimit || 10
                },
                {
                    $skip : (page || 1) * (pageLimit || 10)
                }
            ])

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    product : products
                }
            }
        }
    }
    getProductById = {
        type : createResponseType(responseType),
        args : {
            productId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {

            const {productId} = args
            await validateObjectId.validateAsync(productId)

            const product = await productModel.aggregate([
                {$match : {_id : mongoose.Types.ObjectId(productId)}},
                ...this.#aggregateSchema
            ])
            if(!product) throw createHttpError.NotFound('product not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    product : [
                        product
                    ]
                }
            })
        }
    }
}

export default new productQuery()