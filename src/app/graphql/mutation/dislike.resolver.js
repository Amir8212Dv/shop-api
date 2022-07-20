import {GraphQLString} from 'graphql'
import createHttpError from 'http-errors'
import { verifyAccessTokenGraphQL } from '../../middlewares/verifyAccessToken.js'
import validateObjectId from '../../validators/objectId.js'
import httpStatus from 'http-status-codes'
import courseModel from '../../models/courses.js'
import blogModel from '../../models/blogs.js'
import productModel from '../../models/products.js'
import createResponseType from '../types/responseType.js'

class disLike {

    dislikeProduct = {
        type : createResponseType(),
        args : {
            productId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {productId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(productId)


            const updateProduct = await productModel.updateOne({_id : productId} , {$pull : {likes : userId}})
            if(+updateProduct.matchedCount === 0) throw createHttpError.NotFound('product not found')

            return {
                status : httpStatus.CREATED,
                message : 'like removed successfully',
                data : {}
            }
        }
    }

    dislikeCourse = {
        type : createResponseType(),
        args : {
            courseId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {courseId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(courseId)


            const updateCourse = await courseModel.updateOne({_id : courseId} , {$pull : {likes : userId}})
            if(+updateCourse.matchedCount === 0) throw createHttpError.NotFound('product not found')

            return {
                status : httpStatus.CREATED,
                message : 'like removed successfully',
                data : {}
            }
        }
    }

    dislikeBlog = {
        type : createResponseType(),
        args : {
            blogId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {blogId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(blogId)


            const updateBlog = await blogModel.updateOne({_id : blogId} , {$pull : {likes : userId}})
            if(+updateBlog.matchedCount === 0) throw createHttpError.NotFound('product not found')

            return {
                status : httpStatus.CREATED,
                message : 'like removed successfully',
                data : {}
            }
        }
    }
}

export default new disLike()