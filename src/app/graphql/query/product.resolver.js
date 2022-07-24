import productType from "../types/product.type.js";
import {GraphQLObjectType , GraphQLList , GraphQLString, GraphQLInt} from 'graphql'
import productModel from '../../models/products.js'
import createQueryFilter from "../../utils/createQueryFilter.js";
import httpStatus from 'http-status-codes'
import CreateAggregatePipeline from "../../controllers/createAggregatePipeline.js";
import mongoose from "mongoose";
import autoBind from "auto-bind";
import validateObjectId from "../../validators/objectId.js";
import createHttpError from "http-errors";
import { createNotFoundError } from "../../utils/createError.js";


const responseType = new GraphQLObjectType({
    name : 'productResponseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        data : {type : new GraphQLObjectType({
            name : 'productDataResponseType',
            fields : {
                products : {type : new GraphQLList(productType)}
            }
        })}
    }
})

class productQuery extends CreateAggregatePipeline {
    constructor() {
        super()
        autoBind(this)
    }

    #aggregateSchema = [
        ...this.categoryLookup(),
        ...this.userLookup('suplier'),
        this.likesCount(),
    ]
    getAllProducts = {
        type : responseType,
        args : {
            suplierId : {type : GraphQLString},
            search : {type : GraphQLString},
            tags : {type : GraphQLString},
            categoryId : {type : GraphQLString},
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
                this.fileUrl(process.env.BASE_URL , 'images'),
                {
                    $sort : {
                        [sort || 'title'] : 1
                    }
                },
                {
                    $skip : (page - 1 || 0) * (pageLimit || 10)
                },
                {
                    $limit : pageLimit || 10
                }
            ])

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    products
                }
            }
        }
    }
    getProductById = {
        type : responseType,
        args : {
            productId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {

            const {productId} = args
            await validateObjectId.validateAsync(productId)

            const [product] = await productModel.aggregate([
                {$match : {_id : mongoose.Types.ObjectId(productId)}},
                this.fileUrl(process.env.BASE_URL , 'images'),
                ...this.#aggregateSchema
            ])
            createNotFoundError({products})
            
            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    products : [
                        product
                    ]
                }
            }
        }
    }
}

export default new productQuery()