import express from 'express'
import courseController from '../../controllers/admin/course/course.controller.js'
import { imageUpload } from '../../middlewares/multer.js'

const courseRouter = express.Router()


courseRouter.post('/add' , imageUpload.single('image') , courseController.addCourse)


courseRouter.get('/all' , courseController.getAllCourses)

courseRouter.get('/:courseId' , courseController.getCourseById)

courseRouter.delete('/remove/:courseId' , courseController.removeCourse)

courseRouter.patch('/edit/:courseId' , imageUpload.single('image') , courseController.editCourse)

export default courseRouter