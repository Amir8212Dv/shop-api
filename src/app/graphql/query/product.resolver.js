import productType from "../types/product.type.js";
import {GraphQLObjectType , GraphQLList , GraphQLString} from 'graphql'
import productModel from '../../models/products.js'
import createQueryFilter from "../../utils/createQueryFilter.js";
import createResponseType from "../types/responseType.js";
import httpStatus from 'http-status-codes'

const responseType = {
    products : {type : new GraphQLList(productType)}
}

class productResolver {
    getAllProducts = {
        type : createResponseType(responseType),
        args : {
            suplier : {type : GraphQLString},
            search : {type : GraphQLString},
            tags : {type : GraphQLString},
            category : {type : GraphQLString},
            discount : {type : GraphQLString},
            price : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {

            const queryFilter = createQueryFilter(args)

            const products = await productModel.find(queryFilter)

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

            const product = await productModel.findById(productId)
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

export default new productResolver()