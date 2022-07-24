import validateObjectId from "../../validators/objectId.js"
import httpStatus from 'http-status-codes'
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import commentModel from "../../models/comments.js"
import commentType from "../types/comment.type.js"


const responseType = new GraphQLObjectType({
    name : 'commentResponseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        data : {type : new GraphQLObjectType({
            name : 'commentDataResponseType',
            fields : {
                comments : {type : new GraphQLList(commentType)}
            }
        })}
    }
})

class CommentQuery {
    getAllComments = {
        type : responseType,
        args : {
            id : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {id} = args
            await validateObjectId.validateAsync(id)

            const comments = await commentModel.find({for : id , show : true}).sort({createdAt : 1})

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