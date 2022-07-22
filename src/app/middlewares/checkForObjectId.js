import blogModel from "../models/blogs.js"
import courseModel from "../models/courses.js"
import productModel from "../models/products.js"
import categoryModel from '../models/categories.js'
import { createNotFoundError } from "../utils/createError.js"
import episodeModel from "../models/course.chapter.episodes.js"


export const checkForProductId = async (req , res , next) => {
    try {
        const product = await productModel.findById(req.params.productId)
        createNotFoundError({product})
        next()
    } catch (error) {
        next(error)
    }
}
export const checkForCourseId = async (req , res , next) => {
    try {
        const course = await courseModel.findById(req.params.courseId || req.body.courseId)  
        createNotFoundError({course})
        next()
    } catch (error) {
        next(error)
    }
}
export const checkForBlogId = async (req , res , next) => {
    try {
        const blog = await blogModel.findById(req.params.blogId)
        createNotFoundError({blog})
        next()
    } catch (error) {
        next(error)
    }
}
export const checkForEpisodeId = async (req , res , next) => {
    try {
        const episode = await episodeModel.findById(req.params.episodeId)
        createNotFoundError({episode})
        next()
    } catch (error) {
        next(error)
    }
}
export const checkForCategoryId = async (req , res , next) => {
    try {
        if(req.body.category) {
            const category = await categoryModel.findById(req.body.category)
            createNotFoundError({category})
        }
        next()
    } catch (error) {
        next(error)
    }
}