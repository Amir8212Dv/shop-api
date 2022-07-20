import express from 'express'
import blogController from '../../controllers/admin/blog/blog.controller.js'
import blogsController from '../../controllers/admin/blog/blog.controller.js'
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
    blogsController.createBlog
)


// blogRouter.post('/image/:id' , blogsController.addImage , multer.single('image'))


// blogRouter.get('/all' , blogsController.getAllBlogs)

// blogRouter.get('/comments/:blogId' , blogsController.getCommentsOfBlog)

// blogRouter.get('/:blogId' , blogsController.getBlogById)


blogRouter.delete('/remvoeBlog/:blogId' , checkRole(permissions.WRITER) , blogsController.deleteBlogById)


blogRouter.patch(
    '/update/:blogId' , 
    checkRole(permissions.WRITER) , 
    checkForBlogId,
    checkForCategoryId,
    imageUpload.single('image') , 
    blogsController.updateBlogById
)


export default blogRouter 