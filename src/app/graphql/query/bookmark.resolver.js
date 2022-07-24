import {GraphQLObjectType , GraphQLInt, GraphQLString} from 'graphql'
import { verifyAccessTokenGraphQL } from '../../middlewares/verifyAccessToken.js'
import blogModel from '../../models/blogs.js'
import courseModel from '../../models/courses.js'
import productModel from '../../models/products.js'
import bookmarkType from '../types/bookmark.type.js'
import httpStatus from 'http-status-codes'



const responseType = new GraphQLObjectType({
    name : 'bookmarkResponseType',
    fields : {
        status : {type : GraphQLInt},
        message : {type : GraphQLString},
        data : {type : new GraphQLObjectType({
            name : 'bookmarkDataResponseType',
            fields : {
                bookmarks : {type : bookmarkType}
            }
        })}
    }
})
class BookmarkQuery {

    getUserBookmarks = {
        type : responseType,
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const userId = context.req.user._id

            const products = await productModel.find({bookmarks : userId})
            const courses = await courseModel.find({bookmarks : userId})
            const blogs = await blogModel.find({bookmarks : userId})

            return {
                status : httpStatus.OK,
                message : '',
                data : {
                    bookmarks : {
                        products,
                        courses,
                        blogs
                    }
                }
            }
        }
    }

}
export default new BookmarkQuery()