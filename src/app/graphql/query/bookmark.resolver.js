import {GraphQLObjectType , GraphQLList} from 'graphql'
import { verifyAccessTokenGraphQL } from '../../middlewares/verifyAccessToken.js'
import blogModel from '../../models/blogs.js'
import courseModel from '../../models/courses.js'
import productModel from '../../models/products.js'
import blogType from '../types/blog.type.js'
import bookmarkType from '../types/bookmark.type.js'
import courseType from '../types/course.type.js'
import productType from '../types/product.type.js'

const getUserBookmarks = {
    type : bookmarkType,
    resolve : async (obj , args , context , info) => {
        await verifyAccessTokenGraphQL(context.req)
        const userId = context.req.user._id

        const products = await productModel.find({bookmarks : userId})

        const count = await productModel.findOne({})
        console.log(count)
        const courses = await courseModel.find({bookmarks : userId})
        const blogs = await blogModel.find({bookmark : userId})

        return {
            products,
            courses,
            blogs
        }
    }
}

export default getUserBookmarks