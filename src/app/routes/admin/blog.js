import express from 'express'
import BlogsController from '../../controllers/admin/blog/blog.controller.js'
import { imageUpload } from '../../middlewares/multer.js'
import fromData from 'multer'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'
import { checkForBlogId, checkForCategoryId } from '../../middlewares/checkForObjectId.js'


const blogRouter = express.Router()



blogRouter.post(
    '/create' , 
    checkForCategoryId,
    imageUpload.single('image') ,
    checkRole(permissions.WRITER) , 
    BlogsController.createBlog
)


// blogRouter.post('/image/:id' , BlogsController.addImage , multer.single('image'))


// blogRouter.get('/all' , BlogsController.getAllBlogs)

// blogRouter.get('/comments/:blogId' , BlogsController.getCommentsOfBlog)

// blogRouter.get('/:blogId' , BlogsController.getBlogById)


blogRouter.delete('/remvoeBlog/:blogId' , checkRole(permissions.WRITER) , BlogsController.deleteBlogById)


blogRouter.patch(
    '/update/:blogId' , 
    checkRole(permissions.WRITER) , 
    checkForBlogId,
    checkForCategoryId,
    imageUpload.single('image') , 
    BlogsController.editBlogById
)


export default blogRouter 