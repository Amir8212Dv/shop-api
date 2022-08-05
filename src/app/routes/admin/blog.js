import express from 'express'
import BlogsController from '../../controllers/admin/blog/blog.controller.js'
import { imageUpload } from '../../middlewares/multer.js'
import fromData from 'multer'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'
import { checkForBlogId, checkForCategoryId } from '../../middlewares/checkForObjectId.js'
import { checkAccessForBlogs } from '../../middlewares/checkAccessForCRUD.js'
const blogRouter = express.Router()
blogRouter.post(
    '/create' , 
    checkForCategoryId,
    imageUpload.single('image') ,
    checkRole(permissions.WRITER) , 
    BlogsController.createBlog
)
blogRouter.patch(
    '/edit/:blogId' , 
    checkRole(permissions.WRITER) , 
    checkForBlogId,
    checkAccessForBlogs,
    imageUpload.single('image'),
    checkForCategoryId,
    BlogsController.editBlogById
)
blogRouter.delete('/delete/:blogId' , checkRole(permissions.WRITER) , checkAccessForBlogs , BlogsController.deleteBlogById)
export default blogRouter 