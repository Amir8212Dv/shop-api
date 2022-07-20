import express from 'express'
import courseController from '../../controllers/admin/course/course.controller.js'
import { checkForCategoryId, checkForCourseId } from '../../middlewares/checkForObjectId.js'
import checkRole from '../../middlewares/checkRole.js'
import { imageUpload } from '../../middlewares/multer.js'

const courseRouter = express.Router()


courseRouter.post(
    '/add' , 
    checkRole(permissions.TEACHER) ,
    checkForCategoryId,
    imageUpload.single('image') , 
    courseController.addCourse
)


// courseRouter.get('/all' , courseController.getAllCourses)

// courseRouter.get('/:courseId' , courseController.getCourseById)

courseRouter.delete('/remove/:courseId' , checkRole(permissions.TEACHER) , courseController.removeCourse)

courseRouter.patch(
    '/edit/:courseId' , 
    checkRole(permissions.TEACHER) ,
    checkForCourseId,
    checkForCategoryId,
    imageUpload.single('image') , 
    courseController.editCourse
)

export default courseRouter