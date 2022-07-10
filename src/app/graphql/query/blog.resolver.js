import {GraphQLList , GraphQLString} from 'graphql'
import { verifyAccessTokenGraphQL } from '../../middlewares/verifyAccessToken.js'
import blogModel from '../../models/blogs.js'
import createQueryFilter from '../../utils/createQueryFilter.js'
import blogType from '../types/blog.type.js'

class blogResolver {
    getAllBlogs = {
        type : new GraphQLList(blogType),
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
            return blogs
        }
    }
}

export default new blogResolver()