import blogModel from "../models/blogs.js"
import courseModel from "../models/courses.js"
import productModel from "../models/products.js"
import categoryModel from '../models/categories.js'
import { createNotFoundError } from "../utils/createError.js"
import episodeModel from "../models/course.chapter.episodes.js"


export const checkForProductId = async (req , res , next) => {
    const product = await productModel.findById(req.params.productId)
    createNotFoundError({product})
}
export const checkForCourseId = async (req , res , next) => {
    const course = await courseModel.findById(req.params.courseId || req.body.courseId)  
    createNotFoundError({course})
}
export const checkForBlogId = async (req , res , next) => {
    const blog = await blogModel.findById(req.params.blogId)
    createNotFoundError({blog})
}
export const checkForEpisodeId = async (req , res , next) => {
    const episode = await episodeModel.findById(req.params.episodeId)
    createNotFoundError({episode})
}
export const checkForCategoryId = (req , res , next) => {
    if(req.body.category) {
        const category = await categoryModel.findById(req.body.category)
        createNotFoundError({category})
    }
}