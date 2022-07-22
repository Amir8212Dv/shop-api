import express from 'express'
import CourseController from '../../controllers/admin/course/course.controller.js'
import { checkForCategoryId, checkForCourseId } from '../../middlewares/checkForObjectId.js'
import checkRole from '../../middlewares/checkRole.js'
import { imageUpload } from '../../middlewares/multer.js'
import { permissions } from '../../utils/constants.js'

const courseRouter = express.Router()


courseRouter.post(
    '/add' , 
    checkRole(permissions.TEACHER) ,
    checkForCategoryId,
    imageUpload.single('image') , 
    CourseController.createCourse
)


// courseRouter.get('/all' , CourseController.getAllCourses)

// courseRouter.get('/:courseId' , CourseController.getCourseById)

courseRouter.delete('/remove/:courseId' , checkRole(permissions.TEACHER) , CourseController.deleteCourse)

courseRouter.patch(
    '/edit/:courseId' , 
    checkRole(permissions.TEACHER) ,
    checkForCourseId,
    checkForCategoryId,
    imageUpload.single('image') , 
    CourseController.editCourse
)

export default courseRouter