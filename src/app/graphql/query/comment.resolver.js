import blogModel from "../../models/blogs"
import validateObjectId from "../../validators/objectId"
import createResponseType from "../types/responseType"
import httpStatus from 'http-status-codes'
import createHttpError from "http-errors"
import { GraphQLString } from "graphql"
import commentModel from "../../models/comments"

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

            const comments = await commentModel.find({for : id , show : true})

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