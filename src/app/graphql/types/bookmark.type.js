import {GraphQLObjectType , GraphQLList} from 'graphql'
import blogType from '../types/blog.type.js'
import courseType from '../types/course.type.js'
import productType from '../types/product.type.js'

const bookmarkType = new GraphQLObjectType({
    name : 'getBookmarks',
    fields : {
        products : {type : new GraphQLList(productType)},
        courses : {type : new GraphQLList(courseType)},
        blogs : {type : new GraphQLList(blogType)}
    }
})

export default bookmarkType