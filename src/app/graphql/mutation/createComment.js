import commentType from "../types/comment.type.js";
import { GraphQLString } from 'graphql'
import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import blogModel from "../../models/blogs.js";
import StatusCode from "http-status-codes";
import createHttpError from "http-errors";

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
        if(parent) {
            const checkForParentComment = await blogModel.find({_id : blogId , 'comments._id' : parent} , {'comments.$' : 1})
            if(!checkForParentComment) throw createHttpError.NotFound('blog or parent comment not found')
            if(checkForParentComment.comments[0].parent) throw createHttpError.BadRequest("you can't add a response for a subComment")
        }

        const updatedBlog = await blogModel.updateOne(
            {_id : blogId} , 
            {$push : {comments : {parent , comment , author : context.req.user._id}}}
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