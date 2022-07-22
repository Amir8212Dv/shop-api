import createHttpError from "http-errors"
import mongoose from "mongoose"
import blogModel from "../../../models/blogs.js"
import {CreateBlogValidationSchema , UpdateBlogValidationSchema} from "../../../validators/admin/blog.js"
import autoBind from 'auto-bind'
import httpStatus from 'http-status-codes'
import createImageLink from "../../../utils/createImageLink.js"
import Controller from "../../controller.js"
import validateObjectId from "../../../validators/objectId.js"
import {createNotFoundError } from "../../../utils/createError.js"
import deleteFile from "../../../utils/deleteFiles.js"




class BlogsController extends Controller{


    constructor() {
        super()
        autoBind(this)
    }

    // #blogAggregate = [
    //     this.userLookup('author'),
    //     this.categoryLookup('category'),
    //     {
    //         $unwind : '$author'
    //     },
    //     {
    //         $project : {
    //             'author.bills' : 0,
    //             'author.otp' : 0,
    //             'author.discount' : 0,
    //             'author.roles' : 0,
    //             'author.mobile' : 0,
                
    //         }
    //     },
    //     {
    //         $addFields : {
    //             imageURL : {$concat : [process.env.BASE_URL , '$image']}
    //         }
    //     }
    // ]

    async createBlog(req , res , next) {
        try {
            
            
            await CreateBlogValidationSchema.validateAsync(req.body)
            const author = req.user._id
            
            const imagePath = (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            if(imagePath) req.body.image = imagePath
            
            const blog = await blogModel.create({...req.body , author})
            createNotFoundError({blog})
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
            next(error)
        }
    }


    // async getBlogById(req , res , next) {
    //     try {
    //         const {blogId} = req.params

    //         const [blog] = await blogModel.aggregate([
    //             {
    //                 $match : {_id : mongoose.Types.ObjectId(blogId)}
    //             },
    //             ...this.#blogAggregate
    //         ])

    //         if(!blog) throw createHttpError.NotFound('blog not found')

    //         res.status(httpStatus.OK).send({
    //             status : httpStatus.OK,
    //             message : '',
    //             data : {
    //                 blog : [
    //                     blog
    //                 ]
    //             }
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    // async getAllBlogs(req , res , next) {
    //     try {

    //         const blogs = await blogModel.aggregate([
    //             ...this.#blogAggregate
    //         ])
    //         // const blogs = await blogModel.find({})
            
    //         res.status(httpStatus.OK).send({
    //             status : httpStatus.OK,
    //             message : '',
    //             data : {
    //                 blog : blogs
    //             }
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    // async getCommentsOfBlog(req , res , next) {
    //     try {
            
    //         res.status(httpStatus.OK).send({
    //             status : httpStatus.OK,
    //             message : '',
    //             data : {}
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    async deleteBlogById(req , res , next) {
        try {
            const {blogId} = req.params

            const blog = await blogModel.findByIdAndDelete(blogId)
            createNotFoundError({blog})

            deleteFile(blog.image)
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'blog deleted successfully',
                data : {}
            })
        } catch (error) {
            next(error)
        }
    }
    async editBlogById(req , res , next) {
        try {

            const {blogId} = req.params
            const updateData = req.body
            await validateObjectId.validateAsync(blogId)

            if(req.file) updateData.image = (req.file.path.split('public')[1]).replaceAll('\\' , '/')

            await UpdateBlogValidationSchema.validateAsync(updateData)
            await validateObjectId.validateAsync(blogId)            
            
            const blog = await blogModel.findByIdAndUpdate(blogId , req.body , {returnDocument : 'after'})


            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'blog updated successfully',
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
    
}

export default new BlogsController()