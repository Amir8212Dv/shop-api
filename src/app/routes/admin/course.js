import express from 'express'
import CourseController from '../../controllers/admin/course/course.controller.js'
import { checkForCategoryId, checkForCourseId } from '../../middlewares/checkForObjectId.js'
import checkRole from '../../middlewares/checkRole.js'
import { imageUpload } from '../../middlewares/multer.js'
import { permissions } from '../../utils/constants.js'

const courseRouter = express.Router()

courseRouter.post(
    '/create' , 
    checkRole(permissions.TEACHER) ,
    imageUpload.single('image') , 
    checkForCategoryId,
    CourseController.createCourse
)
courseRouter.patch(
    '/edit/:courseId' , 
    checkRole(permissions.TEACHER) ,
    checkForCourseId,
    imageUpload.single('image') , 
    checkForCategoryId,
    CourseController.editCourse
)
courseRouter.delete('/delete/:courseId' , checkRole(permissions.TEACHER) , CourseController.deleteCourse)


export default courseRouter