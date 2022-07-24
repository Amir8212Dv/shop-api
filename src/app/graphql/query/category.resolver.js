import { GraphQLInt, GraphQLList , GraphQLObjectType, GraphQLString} from 'graphql'
import { nestedCategoryType } from '../types/category.type.js'
import categoryModel from '../../models/categories.js'
import createQueryFilter from '../../utils/createQueryFilter.js'
import httpStatus from 'http-status-codes'
import validateObjectId from '../../validators/objectId.js'
import { createNotFoundError } from '../../utils/createError.js'



const responseType = new GraphQLObjectType({
    name : 'categoryResponseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        data : {type : new GraphQLObjectType({
            name : 'categoryDataResponseType',
            fields : {
                category : {type : new GraphQLList(nestedCategoryType)}
            }
        })}
    }
})

class CategoryQuery {
    getAllCategories = {
        type : responseType,
        args : {
            search : {type : GraphQLString},
        },
        resolve : async (obj , args , context , info) => {
            const queryFilter = createQueryFilter(args)
            if(!args.search) queryFilter.parent = undefined
            
            const categories = await categoryModel.find(queryFilter)
            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    category : categories
                }
            }
        }
    }
    getChildrenOfCategory = {
        type : responseType,
        args : {
            parentId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {parentId} = args
            await validateObjectId.validateAsync(parentId)

            const category = await categoryModel.findById(parentId , {children : 1})
            createNotFoundError({category})

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    category : category.children
                }
            }
        }
    }
    getCategoryById = {
        type : responseType,
        args : {
            categoryId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {categoryId} = args
            await validateObjectId.validateAsync(categoryId)

            const category = await categoryModel.findById(categoryId)
            createNotFoundError(category)

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    category : [
                        category
                    ]
                }
            }
        }
    }
}

export default new CategoryQuery()