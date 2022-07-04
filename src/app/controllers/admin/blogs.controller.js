import createHttpError from "http-errors"
import mongoose from "mongoose"
import blogModel from "../../models/blogs.js"
import { blogSchema } from "../../validators/admin/blog.js"
import autoBind from 'auto-bind'
import path from 'path'
import createImageLink from "../../utils/createImageLink.js"




// add a restriction that only author can change things

// swagger image send has a problem



class blogsController {

    constructor() {
        autoBind(this)
    }

    #blogAggregate = [
        {
            $lookup : {
                from : 'users',
                localField : 'author',
                foreignField : '_id',
                as : 'author'
            }
        },
        {
            $lookup : {
                from : 'categories',
                localField : 'category',
                foreignField : '_id',
                as : 'category'
            }
        },
        {
            $unwind : '$author'
        },
        {
            $project : {
                'author.bills' : 0,
                'author.otp' : 0,
                'author.discount' : 0,
                'author.roles' : 0,
                'author.mobile' : 0,
                
            }
        }
    ]

    async createBlog(req , res , next) {
        try {
            
            await blogSchema.validateAsync(req.boyd)
            const author = req.user._id

            const blog = await blogModel.create({...req.body , author})
            if(!blog) throw createHttpError.BadRequest('create blog failed')

            res.status(201).send({
                status : 201,
                blog
            })
            // req.blogId = blog._id.toString()
            // next()
        } catch (error) {
            next(error)
        }
    }
    async addImage(req , res , next) {
        try {
            console.log(req.file)
            console.log(req.body)
            const imagePath = (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            console.log(req.file.path)

            const blog = await blogModel.findByIdAndUpdate(req.params.id , {image : imagePath} , {returnDocument : 'after'})
        
            res.status(201).send({
                status : 201,
                image : createImageLink(req , imagePath)
            })
        } catch (error) {
            next(error)
        }
    }
    async getBlogById(req , res , next) {
        try {
            const blogId = req.params.id

            const blog = await blogModel.aggregate([
                {
                    $match : {_id : mongoose.Types.ObjectId(blogId)}
                },
                ...this.#blogAggregate
            ])

            if(!blog) throw createHttpError.BadRequest('blog not found')

            res.send({
                status : 20,
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllBlogs(req , res , next) {
        try {

            const blogs = await blogModel.aggregate([
                ...this.#blogAggregate
            ])
            
            res.send({
                status : 200,
                blogs
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
            const blogId = req.params.id

            const deleteBlog = await blogModel.deleteOne({_id : blogId})

            if(!deleteBlog.acknowledged) throw createHttpError.BadRequest('blog not found')
            if(!deleteBlog.deletedCount) throw createHttpError.InternalServerError()
            
            res.send({
                status : 200,
                message : 'blog deleted successfully'
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlogById(req , res , next) {
        try {
            await blogSchema.validateAsync(req.body)
            const blogId = req.params.id 
            
            const updateBlog = await blogModel.findByIdAndUpdate(blogId , req.body , {returnDocument : 'after'})
            
            res.status(201).send({
                status : 201,
                blog : updateBlog
            })
        } catch (error) {
            next(error)
        }
    }
    
}

export default new blogsController()