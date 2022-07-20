import {GraphQLList , GraphQLObjectType, GraphQLString} from 'graphql'
import { verifyAccessTokenGraphQL } from '../../middlewares/verifyAccessToken.js'
import blogModel from '../../models/blogs.js'
import createQueryFilter from '../../utils/createQueryFilter.js'
import blogType from '../types/blog.type.js'
import httpStatus from 'http-status-codes'
import createResponseType from '../types/responseType.js'
import Controller from '../../controllers/controller.js'
import commentType from '../types/comment.type.js'
import autoBind from 'auto-bind'

const responseType = {
    blogs : {type : new GraphQLList(blogType)}
}
const commentResponseType = {
    blogs : {type : new GraphQLList(commentType)}
}

class blogResolver extends Controller {
    constructor() {
        super()
        autoBind(this)
    }
    #blogAggregate = [
        this.userLookup('author'),
        this.categoryLookup('category'),
        {
            $unwind : '$author'
        },
        {
            $project : {
                'author.bills' : 0,
                'author.otp' : 0,
                'author.discount' : 0,
                'author.roles' : 0,
                'author.mobile' : 0,
                
            }
        },
        {
            $addFields : {
                imageURL : {$concat : [process.env.BASE_URL , '$image']}
            }
        }
    ]


    getAllBlogs = {
        type : createResponseType(responseType),
        args : {
            author : {type : GraphQLString},
            search : {type : GraphQLString},
            tags : {type : GraphQLString},
            category : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const queryFilter = createQueryFilter(args)

            const blogs =  await blogModel.find(queryFilter , {_id : 1 , title : 1 , text : 1 , short_text : 1 , tags  :1 , image : 1})
            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    blogs
                }
            }
        }
    }
    getBlogById = {
        type : createResponseType(responseType),
        args : {
            blogId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {blogId} = args
            await validateObjectId.validateAsync(blogId)

            const [blog] = await blogModel.aggregate([
                {
                    $match : {_id : mongoose.Types.ObjectId(blogId)}
                },
                ...this.#blogAggregate
            ])

            if(!blog) throw createHttpError.NotFound('blog not found')

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    blog : [
                        blog
                    ]
                }
            }
        }
    }
    getBlogComments = {
        type : createResponseType(commentResponseType),
        args : {
            blogId : {type : GraphQLString}
        },
        resolve : async (obj , args , context , info) => {
            const {blogId} = args
            await validateObjectId.validateAsync(blogId)

            const [blog] = await blogModel.aggregate([
                {
                    $match : {_id : mongoose.Types.ObjectId(blogId)}
                },
                {
                    $project : {comments : 1}
                },
                this.commentsLookup()
            ])

            if(!blog) throw createHttpError.NotFound('blog not found')

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    comments : blog.comments
                }
            }
        }
    }

}

export default new blogResolver()