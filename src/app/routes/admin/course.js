import express from 'express'
import courseController from '../../controllers/admin/course/course.controller.js'

const courseRouter = express.Router()


courseRouter.post('/add' , courseController.addCourse)

courseRouter.post('/image/:id' , courseController.addImage)

courseRouter.get('/all' , courseController.getAllCourses)

courseRouter.get('/:id' , courseController.getCourseById)

courseRouter.delete('/remove/:id' , courseController.removeCourse)

courseRouter.patch('/edit/:id' , courseController.editCourse)

export default courseRouter