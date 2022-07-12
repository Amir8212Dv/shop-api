import {GraphQLString} from 'graphql'
import createHttpError from 'http-errors'
import { verifyAccessTokenGraphQL } from '../../middlewares/verifyAccessToken.js'
import validateObjectId from '../../validators/objectId.js'
import httpStatus from 'http-status-codes'
import { responseType } from './createComment.resolver.js'
import courseModel from '../../models/courses.js'
import blogModel from '../../models/blogs.js'
import productModel from '../../models/products.js'

class deleteBookmark {

    deleteBookmarkProduct = {
        type : responseType,
        args : {
            productId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {productId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(productId)

            const updateProduct = await productModel.updateOne({_id : productId} , {$pull : {bookmarks : userId}})
            console.log(updateProduct)
            if(+updateProduct.matchedCount === 0) throw createHttpError.NotFound('product not found')

            return {
                status : httpStatus.CREATED,
                message : 'product bookmarke delete successfully'
            }
        }
    }

    deleteBookmarkCourse = {
        type : responseType,
        args : {
            courseId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {courseId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(courseId)


            const updateCourse = await courseModel.updateOne({_id : courseId} , {$pull : {bookmarks : userId}})
            if(+updateCourse.matchedCount === 0) throw createHttpError.NotFound('product not found')

            return {
                status : httpStatus.CREATED,
                message : 'course bookmakre delete successfully'
            }
        }
    }

    deleteBookmarkBlog = {
        type : responseType,
        args : {
            blogId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {blogId} = args
            const userId = context.req.user._id
            await validateObjectId.validateAsync(blogId)


            const updateBlog = await blogModel.updateOne({_id : blogId} , {$pull : {bookmarks : userId}})
            if(+updateBlog.matchedCount === 0) throw createHttpError.NotFound('product not found')

            return {
                status : httpStatus.CREATED,
                message : 'blog bookmark delete successfully'
            }
        }
    }
}

export default new deleteBookmark()