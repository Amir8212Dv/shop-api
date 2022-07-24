import {GraphQLInt, GraphQLList , GraphQLObjectType, GraphQLString} from 'graphql'
import { verifyAccessTokenGraphQL } from '../../middlewares/verifyAccessToken.js'
import blogModel from '../../models/blogs.js'
import createQueryFilter from '../../utils/createQueryFilter.js'
import blogType from '../types/blog.type.js'
import httpStatus from 'http-status-codes'
import CreateAggregatePipeline from '../../controllers/createAggregatePipeline.js'
import autoBind from 'auto-bind'
import validateObjectId from '../../validators/objectId.js'
import mongoose from 'mongoose'
import { createNotFoundError } from '../../utils/createError.js'


const responseType = new GraphQLObjectType({
    name : 'blogResponseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        data : {type : new GraphQLObjectType({
            name : 'blogDataResponseType',
            fields : {
                blogs : {type : new GraphQLList(blogType)}
            }
        })}
    }
})


class BlogQuery extends CreateAggregatePipeline {
    constructor() {
        super()
        autoBind(this)
    }
    #blogAggregate = [
        ...this.userLookup('author'),
        ...this.categoryLookup(),
        this.likesCount(),
    ]
    
    
    getAllBlogs = {
        type : responseType,
        args : {
            authorId : {type : GraphQLString},
            search : {type : GraphQLString},
            tags : {type : GraphQLString},
            categoryId : {type : GraphQLString},
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
                        [sort || 'title'] : 1
                    }
                },
                this.fileUrl(process.env.BASE_URL),
                {
                    $skip : (page - 1 || 0) * (pageLimit || 10)
                },
                {
                    $limit : pageLimit || 10
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
        type : responseType,
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
                this.fileUrl(process.env.BASE_URL),
                ...this.#blogAggregate
            ])

            createNotFoundError({blog})

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    blogs : [
                        blog 
                    ]
                }
            }
        }
    }


}

export default new BlogQuery()