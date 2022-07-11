import graphql from 'graphql'
import createComment from './mutation/createComment.js'
import blogResolver from './query/blog.resolver.js'
import categoryResolver from './query/category.resolver.js'
import courseResolver from './query/course.resolver.js'
import productResolver from './query/product.resolver.js'

const rootQuery = new graphql.GraphQLObjectType({
    name : 'query',
    fields : {
        blogs : blogResolver.getAllBlogs,
        allCategories : categoryResolver.getAllCategories,
        categoryChildren : categoryResolver.getChildrenOfCategory,
        allProducts : productResolver.getAllProducts,
        courses : courseResolver.getAllCourses
    }
})

const rootMutation = new graphql.GraphQLObjectType({
    name : 'Mutation',
    fields : {
        createCommentForBlog : createComment.createCommentForBlogs,
        createCommentForCourses : createComment.createCommentForCourses,
        createCommentForProducts : createComment.createCommentForProducts,
    }
})

const graphqlSchema = new graphql.GraphQLSchema({
    query : rootQuery,
    
    mutation : rootMutation
})

export default graphqlSchema