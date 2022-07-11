import commentType from "../types/comment.type.js";
import { GraphQLString } from 'graphql'
import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import blogModel from "../../models/blogs.js";
import StatusCode from "http-status-codes";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import validateObjectId from "../../validators/objectId.js";

const createComment = {
    type : commentType,
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
            const checkForParentComment = await blogModel.findOne({_id : blogId , 'comments._id' : parent} , {'comments.$' : 1})
            console.log(checkForParentComment.comments[0].parent)

            if(!checkForParentComment) throw createHttpError.NotFound('blog or parent comment not found')
            if(typeof checkForParentComment.comments[0].parent === 'string') throw createHttpError.BadRequest('you cant answer to a subcommand')
        
            const addAnswer = await blogModel.updateOne({_id : blogId , 'comments._id' : parent} , 
            {$push : {'comments.$.answers' : {comment ,author , parent}}})
        }

        const updatedBlog = await blogModel.updateOne(
            {_id : blogId} , 
            {$push : {comments : {parent , comment , author}}}
        )
        if(+updatedBlog.matchedCount === 0) throw createHttpError.NotFound('blog not found')
        if(+updatedBlog.modifiedCount === 0) throw createHttpError.InternalServerError('create comment faild')

        return {
            status : StatusCode.CREATED,
            message : 'comment created successfully'
        }

    }
}

export default createComment