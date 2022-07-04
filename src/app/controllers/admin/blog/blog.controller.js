import createHttpError from "http-errors"
import mongoose from "mongoose"
import blogModel from "../../../models/blogs.js"
import blogValidationSchema from "../../../validators/admin/blog.js"
import autoBind from 'auto-bind'
import httpStatus from 'http-status-codes'
import createImageLink from "../../../utils/createImageLink.js"




// add a restriction that only author can change things



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
            
            await blogValidationSchema.validateAsync(req.boyd)
            const author = req.user._id

            const blog = await blogModel.create({...req.body , author})
            if(!blog) throw createHttpError.BadRequest('create blog failed')

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'blog created successfully',
                data : {
                    blog : [
                        ...blog
                    ]
                }
            })
            // req.blogId = blog._id.toString()
            // next()
        } catch (error) {
            next(error)
        }
    }
    async addImage(req , res , next) {
        try {

            const imagePath = (req.file.path.split('public')[1]).replaceAll('\\' , '/')

            const blog = await blogModel.findByIdAndUpdate(req.params.id , {image : imagePath} , {returnDocument : 'after'})
        
            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'image added to blog successfully',
                data : {
                    image : createImageLink(req , imagePath)
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getBlogById(req , res , next) {
        try {
            const blogId = req.params.id

            const [blog] = await blogModel.aggregate([
                {
                    $match : {_id : mongoose.Types.ObjectId(blogId)}
                },
                ...this.#blogAggregate
            ])

            if(!blog) throw createHttpError.BadRequest('blog not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    blog : [
                        blog
                    ]
                }
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
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    blogs : [
                        blogs
                    ]
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCommentsOfBlog(req , res , next) {
        try {
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {

                }
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
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'blog deleted successfully',
                data : {
                    blog : [
                        deleteBlog
                    ]
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlogById(req , res , next) {
        try {
            await blogValidationSchema.validateAsync(req.body)
            const blogId = req.params.id 
            
            const updateBlog = await blogModel.findByIdAndUpdate(blogId , req.body , {returnDocument : 'after'})
            
            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'blog updated successfully',
                data : {
                    blog : [
                        updateBlog
                    ]
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
}

export default new blogsController()