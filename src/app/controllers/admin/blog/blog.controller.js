import blogModel from "../../../models/blogs.js"
import {CreateBlogValidationSchema , UpdateBlogValidationSchema} from "../../../validators/admin/blog.js"
import httpStatus from 'http-status-codes'
import validateObjectId from "../../../validators/objectId.js"
import {createInternalServerError, createNotFoundError } from "../../../utils/createError.js"
import deleteFile from "../../../utils/deleteFiles.js"
import path from 'path'



class BlogsController {

    async createBlog(req , res , next) {
        try {
            await CreateBlogValidationSchema.validateAsync(req.body)
            const author = req.user._id
            
            const imagePath = (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            if(imagePath) req.body.image = imagePath
            
            const blog = await blogModel.create({...req.body , author})
            createInternalServerError(blog)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'blog created successfully',
                data : {
                    blog
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    async deleteBlogById(req , res , next) {
        try {
            const {blogId} = req.params

            const blog = await blogModel.findById(blogId , {image : 1})
            const deleteBlog = await blogModel.deleteOne({_id : blogId})
            createNotFoundError({blog})
            createInternalServerError(deleteBlog.deletedCount)

            deleteFile(path.join(process.argv[1] , '..' , '..' , 'public' , blog.image))

            
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
            
            const blog = await blogModel.updateOne({_id : blogId} , updateData)
            createNotFoundError({blog})
            createInternalServerError(blog.modifiedCount)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'blog updated successfully',
                data : {}
            })
        } catch (error) {
            next(error)
        }
    }
    
}

export default new BlogsController()