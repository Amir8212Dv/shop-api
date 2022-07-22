import { GraphQLList , GraphQLObjectType, GraphQLString} from 'graphql'
import { nestedCategoryType } from '../types/category.type.js'
import categoryModel from '../../models/categories.js'
import createQueryFilter from '../../utils/createQueryFilter.js'
import httpStatus from 'http-status-codes'
import createResponseType from '../types/responseType.js'

const responseType = {
    category : {type : new GraphQLList(nestedCategoryType)}
}

class CategoryQuery {
    getAllCategories = {
        type : createResponseType(responseType),
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
                    category
                }
            }
        }
    }
    getChildrenOfCategory = {
        type : createResponseType(responseType),
        args : {
            parentId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {parentId} = args
            await validateObjectId.validateAsync(parentId)

            const category = await categoryModel.findById(parentId , {children : 1})
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
        type : createResponseType(responseType),
        args : {
            categoryId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {categoryId} = args
            await validateObjectId.validateAsync(categoryId)

            const category = await categoryModel.findById(categoryId)

            if(!category) throw createHttpError.NotFound('category not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    category : [
                        category
                    ]
                }
            })
        }
    }
}

export default new CategoryQuery()