import express from 'express'
import blogsController from '../../controllers/admin/blog/blog.controller.js'
import multer from '../../middlewares/multer.js'

const blogRouter = express.Router()



blogRouter.post('/create' , blogsController.createBlog)


blogRouter.post('/image/:id' , blogsController.addImage , multer.single('image'))


blogRouter.get('/all' , blogsController.getAllBlogs)

blogRouter.get('/comments/:id' , blogsController.getCommentsOfBlog)


blogRouter.get('/:id' , blogsController.getBlogById)


blogRouter.delete('/remvoeBlog/:id' , blogsController.deleteBlogById)


blogRouter.patch('/update/:id' , blogsController.updateBlogById)


export default blogRouter 