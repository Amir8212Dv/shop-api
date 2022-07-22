import blogModel from "../../models/blogs.js"
import validateObjectId from "../../validators/objectId.js"
import createResponseType from "../types/responseType.js"
import httpStatus from 'http-status-codes'
import createHttpError from "http-errors"
import { GraphQLList, GraphQLString } from "graphql"
import commentModel from "../../models/comments.js"
import commentType from "../types/comment.type.js"

const commentResponseType = {
    blogs : {type : new GraphQLList(commentType)}
}

class CommentQuery {
    getComments = {
        type : createResponseType(commentResponseType),
        args : {
            id : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {id} = args
            await validateObjectId.validateAsync(id)

            const comments = await commentModel.find({for : id , show : true}).sort({createdAt : -1})

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    comments
                }
            }
        }
    }

}

export default new CommentQuery()   