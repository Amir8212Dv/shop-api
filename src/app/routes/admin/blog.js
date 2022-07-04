import express from 'express'
import blogsController from '../../controllers/admin/blogs.controller.js'
import multer from '../../middlewares/multer.js'

const router = express.Router()



router.post('/create' , blogsController.createBlog)


router.post('/image/:id' , blogsController.addImage , multer.single('image'))


router.get('/all' , blogsController.getAllBlogs)

router.get('/comments/:id' , blogsController.getCommentsOfBlog)


router.get('/:id' , blogsController.getBlogById)


router.delete('/remvoeBlog/:id' , blogsController.deleteBlogById)


router.patch('/update/:id' , blogsController.updateBlogById)


export default router