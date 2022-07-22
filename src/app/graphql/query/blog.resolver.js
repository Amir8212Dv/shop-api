import {GraphQLInt, GraphQLList , GraphQLObjectType, GraphQLString} from 'graphql'
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


class BlogQuery extends Controller {
    constructor() {
        super()
        autoBind(this)
    }
    #blogAggregate = [
        ...this.userLookup('author'),
        this.categoryLookup('category'),
        {
            $unwind : '$author'
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
            category : {type : GraphQLString},
            sort : {type : GraphQLString},
            page : {type : GraphQLInt},
            pageLimit : {type : GraphQLInt}
        },
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const queryFilter = createQueryFilter(args)
            const {page , pageLimit , sort} = args

            const blogs =  await blogModel.aggregate([
                {$match : queryFilter},
                ...this.#blogAggregate,
                {
                    $sort : {
                        [sort] : 1
                    }
                },
                {
                    $limit : pageLimit || 10
                },
                {
                    $skip : (page || 1) * (pageLimit || 10)
                }
            ])
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


}

export default new BlogQuery()