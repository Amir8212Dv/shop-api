import createHttpError from "http-errors"
import blogModel from "../../models/blogs.js"
import { createBlogSchema } from "../../validators/admin/blog.js"


class blogsController {
    async createBlog(req , res , next) {
        try {
            
            createBlogSchema.validate(req.boyd)
            const {title , text , short_text , tags , category} = req.boyd

            const blog = await blogModel.create({title , text , short_text , tags , category})
            if(!blog) throw createHttpError.BadRequest('create blog failed')

            res.status(201).send({
                status : 201,
                blog
            })
        } catch (error) {
            next(error)
        }
    }
    async addImage(req , res , next) {
        try {
            console.log(req.file)
        } catch (error) {
            next(error)
        }
    }
    async getBlogById(req , res , next) {
        try {
            
            res.send({
                status : 20,
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllBlogs(req , res , next) {
        try {
            
            res.send({
                status : 20,
            })
        } catch (error) {
            next(error)
        }
    }
    async getCommentsOfBlog(req , res , next) {
        try {
            
            res.send({
                status : 20,
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteBlogById(req , res , next) {
        try {
            
            res.send({
                status : 20,
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlogById(req , res , next) {
        try {
            
            res.send({
                status : 20,
            })
        } catch (error) {
            next(error)
        }
    }
    
}

export default new blogsController()