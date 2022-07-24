import {GraphQLString} from 'graphql'
import { verifyAccessTokenGraphQL } from '../../middlewares/verifyAccessToken.js'
import validateObjectId from '../../validators/objectId.js'
import httpStatus from 'http-status-codes'
import courseModel from '../../models/courses.js'
import blogModel from '../../models/blogs.js'
import productModel from '../../models/products.js'
import responseType from '../types/responseType.js'
import { createInternalServerError, createNotFoundError } from '../../utils/createError.js'

class LikeMutation {

    likeProduct = {
        type : responseType,
        args : {
            productId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {productId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(productId)

            const product = await productModel.updateOne({_id : productId} , {$addToSet : {likes : userId}})
            createNotFoundError({product})
            createInternalServerError(product.modifiedCount)
            return {
                status : httpStatus.CREATED,
                message : 'like added successfully',
                data : {}
            }
        }
    }

    likeCourse = {
        type : responseType,
        args : {
            courseId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {courseId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(courseId)


            const course = await courseModel.updateOne({_id : courseId} , {$addToSet : {likes : userId}})
            createNotFoundError({course})
            createInternalServerError(course.modifiedCount)
            return {
                status : httpStatus.CREATED,
                message : 'like added successfully',
                data : {}
            }
        }
    }

    likeBlog = {
        type : responseType,
        args : {
            blogId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {blogId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(blogId)


            const blog = await blogModel.updateOne({_id : blogId} , {$addToSet : {likes : userId}})
            createNotFoundError({blog})
            createInternalServerError(blog.modifiedCount)
            return {
                status : httpStatus.CREATED,
                message : 'like added successfully',
                data : {}
            }
        }
    }
}

export default new LikeMutation()