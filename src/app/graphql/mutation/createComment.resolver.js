import commentType from "../types/comment.type.js";
import { GraphQLString , GraphQLInt , GraphQLObjectType } from 'graphql'
import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import blogModel from "../../models/blogs.js";
import StatusCode from "http-status-codes";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import validateObjectId from "../../validators/objectId.js";
import courseModel from "../../models/courses.js";
import productModel from "../../models/products.js";
import commentModel from "../../models/comments.schema.js";
import createResponseType from "../types/responseType.js";


class createComment {
    createCommentForBlogs = {
        type : createResponseType(),
        args : {
            comment : {type : GraphQLString},
            parent : {type : GraphQLString},
            blogId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {parent , comment , blogId} = args
            await validateObjectId.validateAsync(blogId)
            const author = context.req.user._id

            if(parent) {
                await validateObjectId.validateAsync(parent)
                const checkForComment = await commentModel.findOne({_id : parent})
    
                if(!checkForComment) throw createHttpError.NotFound('parent comment not found')

                checkForComment.answers.push({comment ,author , parent})
                await checkForComment.save()

            } else {
                const createComment = await commentModel.create({comment , author})
                if(!createComment) throw createHttpError.InternalServerError('create comment faild')
                const updatedBlog = await blogModel.updateOne(
                    {_id : blogId},
                    {$push : {comments : createComment._id}}
                )
                if(+updatedBlog.matchedCount === 0) throw createHttpError.NotFound('blog not found')
                if(+updatedBlog.modifiedCount === 0) throw createHttpError.InternalServerError('create comment faild')
            }
    
    
            return {
                status : StatusCode.CREATED,
                message : 'comment created successfully',
                data : {}
            }
        }

    }
    createCommentForCourses = {
        type : createResponseType(),
        args : {
            comment : {type : GraphQLString},
            parent : {type : GraphQLString},
            courseId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {parent , comment , courseId} = args
            await validateObjectId.validateAsync(courseId)
            const author = context.req.user._id

            if(parent) {
                console.log('a')
                await validateObjectId.validateAsync(parent)
                const checkForComment = await commentModel.findOne({_id : parent})
    
                if(!checkForComment) throw createHttpError.NotFound('parent comment not found')

                checkForComment.answers.push({comment ,author , parent})
                await checkForComment.save()

            } else {
                const createComment = await commentModel.create({comment , author})
                if(!createComment) throw createHttpError.InternalServerError('create comment faild')
                const updateCourse = await courseModel.updateOne(
                    {_id : courseId},
                    {$push : {comments : createComment._id}}
                )
                console.log(updateCourse)
                if(+updateCourse.matchedCount === 0) throw createHttpError.NotFound('course not found')
                if(+updateCourse.modifiedCount === 0) throw createHttpError.InternalServerError('create comment faild')
            }
    
    
            return {
                status : StatusCode.CREATED,
                message : 'comment created successfully',
                data : {}
            }
    
        }

    }
    createCommentForProducts = {
        type : createResponseType(),
        args : {
            comment : {type : GraphQLString},
            parent : {type : GraphQLString},
            productId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {parent , comment , productId} = args
            await validateObjectId.validateAsync(productId)
            const author = context.req.user._id

            if(parent) {
                await validateObjectId.validateAsync(parent)
                const checkForComment = await commentModel.findOne({_id : parent})
    
                if(!checkForComment) throw createHttpError.NotFound('parent comment not found')

                checkForComment.answers.push({comment ,author , parent})
                await checkForComment.save()
            } else {
                const createComment = await commentModel.create({comment , author})
                if(!createComment) throw createHttpError.InternalServerError('create comment faild')
                const updateProduct = await productModel.updateOne(
                    {_id : productId},
                    {$push : {comments : createComment._id}}
                )
                if(+updateProduct.matchedCount === 0) throw createHttpError.NotFound('product not found')
                if(+updateProduct.modifiedCount === 0) throw createHttpError.InternalServerError('create comment faild')
            }
    
    
            return {
                status : StatusCode.CREATED,
                message : 'comment created successfully',
                data : {}
            }
    
        }

    }
}

export default new createComment()