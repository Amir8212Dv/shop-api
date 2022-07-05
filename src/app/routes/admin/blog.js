import express from 'express'
import blogController from '../../controllers/admin/blog/blog.controller.js'
import blogsController from '../../controllers/admin/blog/blog.controller.js'
import { imageUpload } from '../../middlewares/multer.js'
import fromData from 'multer'


const blogRouter = express.Router()



blogRouter.post('/create' , imageUpload.single('image') , blogsController.createBlog)


// blogRouter.post('/image/:id' , blogsController.addImage , multer.single('image'))


blogRouter.get('/all' , blogsController.getAllBlogs)

blogRouter.get('/comments/:id' , blogsController.getCommentsOfBlog)


blogRouter.get('/:id' , blogsController.getBlogById)


blogRouter.delete('/remvoeBlog/:id' , blogsController.deleteBlogById)


blogRouter.patch('/update/:id' , imageUpload.single('image') , blogsController.updateBlogById)


export default blogRouter 