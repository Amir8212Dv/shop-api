import { GraphQLList , GraphQLString} from 'graphql'
import { nestedCategoryType } from '../types/category.type.js'
import categoryModel from '../../models/categories.js'
import createQueryFilter from '../../utils/createQueryFilter.js'


class categoryResolver {
    getAllCategories = {
        type : new GraphQLList(nestedCategoryType),
        args : {
            search : {type : GraphQLString},
        },
        resolve : async (obj , args , context , info) => {
            const queryFilter = createQueryFilter(args)
            if(!args.search) queryFilter.parent = undefined
            console.log(queryFilter)
            const categories = await categoryModel.find(queryFilter)
            return categories
        }
    }
    getChildrenOfCategory = {
        type : new GraphQLList(nestedCategoryType),
        args : {
            parentId : {type : GraphQLString}
        },
        resolve : async (obj , args) => {
            const category = await categoryModel.findById(args.parentId , {children : 1})
            return category.children
        }
    }
}

export default new categoryResolver()