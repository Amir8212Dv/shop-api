import graphql from 'graphql'
import bookmarkResolver from './mutation/bookmark.resolver.js'
import createComment from './mutation/createComment.resolver.js'
import deleteBookmarkResolver from './mutation/deleteBookmark.resolver.js'
import dislikeResolver from './mutation/dislike.resolver.js'
import likeResolver from './mutation/like.resolver.js'
import blogResolver from './query/blog.resolver.js'
import getUserBookmarks from './query/bookmark.resolver.js'
import categoryResolver from './query/category.resolver.js'
import courseResolver from './query/course.resolver.js'
import productResolver from './query/product.resolver.js'
import addBasketResolver from './mutation/addBasket.resolver.js'
import deleteFromBasketResolver from './mutation/deleteFromBasket.resolver.js'
import getBasket from './query/basket.resolver.js'

const rootQuery = new graphql.GraphQLObjectType({
    name : 'query',
    fields : {
        blogs : blogResolver.getAllBlogs,
        allCategories : categoryResolver.getAllCategories,
        categoryChildren : categoryResolver.getChildrenOfCategory,
        allProducts : productResolver.getAllProducts,
        courses : courseResolver.getAllCourses,
        bookmarks : getUserBookmarks,
        getBasket : getBasket
    }
})

const rootMutation = new graphql.GraphQLObjectType({
    name : 'Mutation',
    fields : {
        createCommentForBlog : createComment.createCommentForBlogs,
        createCommentForCourses : createComment.createCommentForCourses,
        createCommentForProducts : createComment.createCommentForProducts,

        likeProduct : likeResolver.likeProduct,
        likeCourse : likeResolver.likeCourse,
        likeBlog : likeResolver.likeBlog,

        dislikeProduct : dislikeResolver.dislikeProduct,
        dislikeCourse : dislikeResolver.dislikeCourse,
        dislikeBlog : dislikeResolver.dislikeBlog,

        bookmarkProduct : bookmarkResolver.bookmarkProduct,
        bookmarkCourse : bookmarkResolver.bookmarkCourse,
        bookmarkBlog : bookmarkResolver.bookmarkBlog,

        deleteBookmarkProduct : deleteBookmarkResolver.deleteBookmarkProduct,
        deleteBookmarkCourse : deleteBookmarkResolver.deleteBookmarkCourse,
        deleteBookmarkBlog : deleteBookmarkResolver.deleteBookmarkBlog,

        addProductToBasket : addBasketResolver.addProduct,
        addCourseToBasket : addBasketResolver.addCourse,

        decreaseBasketProduct : deleteFromBasketResolver.decreaseProduct,
        deleteBasketProduct : deleteFromBasketResolver.deleteProduct,
        deleteBasketCourse : deleteFromBasketResolver.deleteCourse,
    }
})

const graphqlSchema = new graphql.GraphQLSchema({
    query : rootQuery,
    
    mutation : rootMutation
})

export default graphqlSchema