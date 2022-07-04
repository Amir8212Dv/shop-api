import express from 'express'
import courseController from '../../controllers/admin/course.controller'

const router = express.Router()


router.post('/add' , courseController.addCourse)

router.post('/image/:id' , courseController.addImage)

router.get('/all' , courseController.getAllCourses)

router.get('/:id' , courseController.getCourseById)

router.delete('/remove/:id' , courseController.removeCourse)

router.patch('/edit/:id' , courseController.editCourse)

export default router