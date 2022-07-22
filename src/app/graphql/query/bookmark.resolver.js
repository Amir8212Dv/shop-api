import {GraphQLObjectType , GraphQLList} from 'graphql'
import { verifyAccessTokenGraphQL } from '../../middlewares/verifyAccessToken.js'
import blogModel from '../../models/blogs.js'
import courseModel from '../../models/courses.js'
import productModel from '../../models/products.js'
import blogType from '../types/blog.type.js'
import bookmarkType from '../types/bookmark.type.js'
import courseType from '../types/course.type.js'
import productType from '../types/product.type.js'
import httpStatus from 'http-status-codes'
import createResponseType from '../types/responseType.js'

const responseType = {
    bookmarks : {type : new GraphQLList(bookmarkType)}
}
class BookmarkQuery {

    getUserBookmarks = {
        type : createResponseType(responseType),
        resolve : async (obj , args , context , info) => {
            await verifyAccessTokenGraphQL(context.req)
            const userId = context.req.user._id
            await validateObjectId.validateAsync(userId)

            const products = await productModel.find({bookmarks : userId})

            const count = await productModel.findOne({})
            const courses = await courseModel.find({bookmarks : userId})
            const blogs = await blogModel.find({bookmark : userId})

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