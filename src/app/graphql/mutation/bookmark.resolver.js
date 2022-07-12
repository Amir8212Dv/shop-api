import {GraphQLString} from 'graphql'
import createHttpError from 'http-errors'
import { verifyAccessTokenGraphQL } from '../../middlewares/verifyAccessToken.js'
import validateObjectId from '../../validators/objectId.js'
import httpStatus from 'http-status-codes'
import { responseType } from './createComment.resolver.js'
import courseModel from '../../models/courses.js'
import blogModel from '../../models/blogs.js'
import productModel from '../../models/products.js'

class bookmark {

    bookmarkProduct = {
        type : responseType,
        args : {
            productId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {productId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(productId)

            const updateProduct = await productModel.updateOne({_id : productId} , {$addToSet : {bookmarks : userId}})
            console.log(updateProduct)
            if(+updateProduct.matchedCount === 0) throw createHttpError.NotFound('product not found')

            return {
                status : httpStatus.CREATED,
                message : 'product bookmarked successfully'
            }
        }
    }

    bookmarkCourse = {
        type : responseType,
        args : {
            courseId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {courseId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(courseId)


            const updateCourse = await courseModel.updateOne({_id : courseId} , {$addToSet : {bookmarks : userId}})
            if(+updateCourse.matchedCount === 0) throw createHttpError.NotFound('product not found')

            return {
                status : httpStatus.CREATED,
                message : 'course bookmakred successfully'
            }
        }
    }

    bookmarkBlog = {
        type : responseType,
        args : {
            blogId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {blogId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(blogId)


            const updateBlog = await blogModel.updateOne({_id : blogId} , {$addToSet : {bookmarks : userId}})
            if(+updateBlog.matchedCount === 0) throw createHttpError.NotFound('product not found')

            return {
                status : httpStatus.CREATED,
                message : 'blog bookmarked successfully'
            }
        }
    }
}

export default new bookmark()