import graphql from 'graphql'
import BookmarkMutation from './mutation/bookmark.resolver.js'
import CommentMutation from './mutation/createComment.resolver.js'
import DeleteBookmarkMutation from './mutation/deleteBookmark.resolver.js'
import DislikeMutation from './mutation/dislike.resolver.js'
import LikeMutation from './mutation/like.resolver.js'
import BlogQuery from './query/blog.resolver.js'
import getUserBookmarks from './query/bookmark.resolver.js'
import CategoryQuery from './query/category.resolver.js'
import CourseQuery from './query/course.resolver.js'
import ProductQuery from './query/product.resolver.js'
import AddBasketMutation from './mutation/addBasket.resolver.js'
import DeleteFromBasketMutation from './mutation/deleteFromBasket.resolver.js'
import BasketQuery from './query/basket.resolver.js'
import BookmarkQuery from './query/bookmark.resolver.js'
import ChapterQuery from './query/chapter.resolver.js'
import EpisodeQuery from './query/episode.resolver.js'

const rootQuery = new graphql.GraphQLObjectType({
    name : 'query',
    fields : {
        allBlogs : BlogQuery.getAllBlogs,
        getBlogById : BlogQuery.getBlogById,
        getBlogComments : BlogQuery.getBlogComments,
        allCategories : CategoryQuery.getAllCategories,
        categoryChildren : CategoryQuery.getChildrenOfCategory,
        getCategoryById : CategoryQuery.getCategoryById,
        allChapters : ChapterQuery.getAllChapters,
        getChapterById : ChapterQuery.getChapterById,
        allProducts : ProductQuery.getAllProducts,
        getProductById : ProductQuery.getProductById,
        allCourses : CourseQuery.getAllCourses,
        getCourseById : CourseQuery.getCourseById,
        getEpisodeById : EpisodeQuery.getEpisodeById,
        bookmarks : BookmarkQuery.getUserBookmarks,
        getBasket : BasketQuery.getBasket
    }
})

const rootMutation = new graphql.GraphQLObjectType({
    name : 'Mutation',
    fields : {
        createCommentForBlog : CommentMutation.createCommentForBlogs,
        createCommentForCourses : CommentMutation.createCommentForCourses,
        createCommentForProducts : CommentMutation.createCommentForProducts,

        likeProduct : LikeMutation.likeProduct,
        likeCourse : LikeMutation.likeCourse,
        likeBlog : LikeMutation.likeBlog,

        dislikeProduct : DislikeMutation.dislikeProduct,
        dislikeCourse : DislikeMutation.dislikeCourse,
        dislikeBlog : DislikeMutation.dislikeBlog,

        bookmarkProduct : BookmarkMutation.bookmarkProduct,
        bookmarkCourse : BookmarkMutation.bookmarkCourse,
        bookmarkBlog : BookmarkMutation.bookmarkBlog,

        deleteBookmarkProduct : DeleteBookmarkMutation.deleteBookmarkProduct,
        deleteBookmarkCourse : DeleteBookmarkMutation.deleteBookmarkCourse,
        deleteBookmarkBlog : DeleteBookmarkMutation.deleteBookmarkBlog,

        addProductToBasket : AddBasketMutation.addProduct,
        addCourseToBasket : AddBasketMutation.addCourse,

        decreaseBasketProduct : DeleteFromBasketMutation.decreaseProduct,
        deleteBasketProduct : DeleteFromBasketMutation.deleteProduct,
        deleteBasketCourse : DeleteFromBasketMutation.deleteCourse,
    }
})

const graphqlSchema = new graphql.GraphQLSchema({
    query : rootQuery,
    
    mutation : rootMutation
})

export default graphqlSchema