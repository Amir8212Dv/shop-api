import createHttpError from "http-errors"
import mongoose from "mongoose"
import blogModel from "../../../models/blogs.js"
import {CreateBlogValidationSchema , UpdateBlogValidationSchema} from "../../../validators/admin/blog.js"
import autoBind from 'auto-bind'
import httpStatus from 'http-status-codes'
import createImageLink from "../../../utils/createImageLink.js"
import Controller from "../../controller.js"




// add a restriction that only author can change things



class blogsController extends Controller{


    constructor() {
        super()
        autoBind(this)
    }

    #blogAggregate = [
        this.userLookup('author'),
        this.categoryLookup('category'),
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
            
            console.log(req.body)   
            
            await CreateBlogValidationSchema.validateAsync(req.body)
            const author = req.user._id
            
            const imagePath = (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            if(imagePath) req.body.image = imagePath
            
            const blog = await blogModel.create({...req.body , author})
            if(!blog) throw createHttpError.BadRequest('create blog failed')
            blog.image = createImageLink(blog.image)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'blog created successfully',
                data : {
                    blog : [
                        blog
                    ]
                }
            })
            
        } catch (error) {
            console.log(error)
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
                    blog : blogs
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
            console.log(req.file)
            await UpdateBlogValidationSchema.validateAsync(req.body)
            if(req.file) req.body.image = (req.file.path.split('public')[1]).replaceAll('\\' , '/')
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