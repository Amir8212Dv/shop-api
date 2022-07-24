import { GraphQLString } from 'graphql'
import { verifyAccessTokenGraphQL } from "../../middlewares/verifyAccessToken.js";
import StatusCode from "http-status-codes";
import createHttpError from "http-errors";
import validateObjectId from "../../validators/objectId.js";
import commentModel from "../../models/comments.js";
import responseType from "../types/responseType.js";
import { createInternalServerError, createNotFoundError } from "../../utils/createError.js";


class CreateCommentMutation {
    createCommentForBlogs = {
        type : responseType,
        args : {
            comment : {type : GraphQLString},
            parent : {type : GraphQLString},
            id : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const {parent , comment , id} = args
            await validateObjectId.validateAsync(id)
            const author = context.req.user._id

            if(parent) {
                await validateObjectId.validateAsync(parent)
                const parent = await commentModel.findOne({_id : parent})
                createNotFoundError({parent})
                if(parent.parent) throw createHttpError.BadRequest('you cant answe to a subcomment')
            } 

            const commentData = parent ? {comment , parent , author , for : id} : {comment , author , for : id}
            const createComment = await commentModel.create(commentData)
            createInternalServerError(createComment)
    
            return {
                status : StatusCode.CREATED,
                message : 'comment created successfully',
                data : {}
            }
        }
    }
}

export default new CreateCommentMutation()