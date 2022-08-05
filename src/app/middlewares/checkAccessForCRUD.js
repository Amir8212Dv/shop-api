import userModel from '../models/users.js'
import { roles } from '../utils/constants.js'
import createHttpError from 'http-errors'
import courseModel from '../models/courses.js'
import productModel from '../models/products.js'
import chapterModel from '../models/course.chapters.js'
import episodeModel from '../models/course.chapter.episodes.js'

const checkUserIsAdmin = userId => {
    const user = await userModel.findById(userId)
    return user.role === roles.ADMIN
}
export const checkAccessForBlogs = (req , res , next) => {
    try {
        const userId = req.user._id
        const {blogId} = req.params

        const {author} = await blogModel.findById(blogId)
        if(author.toString() === userId) return next()

        const isAdmin = checkUserIsAdmin(userId)
        if(isAdmin) return next()

        throw new createHttpError.Forbidden('only blog author can edit or delete blog')
    } catch (error) {
        next(error)
    }
}
export const checkAccessForCourses = (req , res , next) => {
    try {
        const userId = req.user._id
        const {courseId} = req.params
    
        const {teacher} = await courseModel.findById(courseId)
        if(teacher.toString() === userId) return next()
    
        const isAdmin = checkUserIsAdmin(userId)
        if(isAdmin) return next()
    
        throw new createHttpError.Forbidden('only course teacher can edit or delete course')
    } catch (error) {
        next(error)
    }
}
export const checkAccessForProducts = (req , res , next) => {
    try {
        const userId = req.user._id
        const {productId} = req.params
    
        const {suplier} = await productModel.findById(productId)
        if(suplier.toString() === userId) return next()
    
        const isAdmin = checkUserIsAdmin(userId)
        if(isAdmin) return next()
    
        throw new createHttpError.Forbidden('only product suplier can edit or delete product')
    } catch (error) {
        next(error)
    }
}

export const checkAccessForChapters = (req , res , next) => {
    try {
        const userId = req.user._id
        const {chapterId} = req.params
        let courseId = req.body.courseId

        if(chapterId) {
            const chapter = await chapterModel.findById(chapterId)
            courseId = chapter.courseId
        }
        
        const {teacher} = await courseModel.findById(courseId)
        if(teacher.toString() === userId) return next()
    
        const isAdmin = checkUserIsAdmin(userId)
        if(isAdmin) return next()
    
        throw new createHttpError.Forbidden('only course teacher can access course chapters')
    } catch (error) {
        next(error)
    }
}

export const checkAccessForEpisodes = (req , res , next) => {
    try {
        const userId = req.user._id
        const {episodeId} = req.params
        let courseId = req.body.courseId

        if(episodeId) {
            const episode = await episodeModel.findById(episodeId)
            courseId = episode.courseId
        }
        
        const {teacher} = await courseModel.findById(courseId)
        if(teacher.toString() === userId) return next()
    
        const isAdmin = checkUserIsAdmin(userId)
        if(isAdmin) return next()
    
        throw new createHttpError.Forbidden('only course teacher can access course episodes')
    } catch (error) {
        next(error)
    }
}