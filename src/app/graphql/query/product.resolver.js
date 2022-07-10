import productType from "../types/product.type.js";
import { GraphQLList , GraphQLString} from 'graphql'
import productModel from '../../models/products.js'
import createQueryFilter from "../../utils/createQueryFilter.js";


class productResolver {
    getAllProducts = {
        type : new GraphQLList(productType),
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

            return products
        }
    }
}

export default new productResolver()