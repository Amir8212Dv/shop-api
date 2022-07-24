import stringToArray from '../../../utils/stringToArray.js'
import {createCourseValidationSchema , updateCourseValidationSchema} from '../../../validators/admin/course.js'
import courseModel from '../../../models/courses.js'
import createHttpError from 'http-errors'
import httpStatus from 'http-status-codes'
import CreateAggregatePipeline from '../../createAggregatePipeline.js'
import validateObjectId from '../../../validators/objectId.js'
import chapterModel from '../../../models/course.chapters.js'
import episodeModel from '../../../models/course.chapter.episodes.js'
import { createInternalServerError, createNotFoundError } from '../../../utils/createError.js'
import userModel from '../../../models/users.js'
import basketModel from '../../../models/basket.js'


class CourseController extends CreateAggregatePipeline {

    async createCourse(req , res , next) {
        try {
            if(req.file) req.body.image = (req.file.path.split('public')[1]).replaceAll('\\' , '/')

            req.body.tags = stringToArray(req.body.tags)

            await createCourseValidationSchema.validateAsync(req.body)
            
            const course = await courseModel.create({...req.body , teacher : req.user._id})
            createInternalServerError(course)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'courses created successfully',
                data : {
                    course
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async deleteCourse(req , res , next) {
        try {

            const {courseId} = req.params
            await validateObjectId.validateAsync(courseId)

            const user = await userModel.find({courses : courseId})
            if(user.length) throw createHttpError.BadRequest('course can not be deleted , because some users already got that')

            const course = await courseModel.findById(courseId)
            createNotFoundError({course})

            const deleteCourse = await courseModel.deleteOne({_id : courseId})
            createInternalServerError(deleteCourse.deletedCount)

            const deleteChapters = await chapterModel.deleteMany({courseId})
            const deleteEpisodes = await episodeModel.deleteMany({courseId})

            deleteFile(path.join(process.argv[1] , '..' , '..' , 'public' , course.image))

            // updates users basket info
            const totalPrice = course.price - course.discount  
            const baskets = await basketModel.find({'courses.courseId' : courseId})
            baskets.forEach(basket => {
                basket.courses = basket.courses.filter(item => item.courseId.toString() !== courseId)

                basket.totalPrice -= totalPrice
                basket.save()
            })

            

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'course deleted successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
    async editCourse(req , res , next) {
        try {

            const { courseId } = req.params 
            await validateObjectId.validateAsync(courseId)

            const updateData = req.body
            await updateCourseValidationSchema.validateAsync(updateData)
        
            const {price : oldPrice , discount : oldDiscount} = await courseModel.findById(courseId)

            const course = await courseModel.findByIdAndUpdate(courseId , updateData , {returnDocument : 'after'})
            createNotFoundError(course)

            // updates users basket info
            if(updateData.price || updateData.discount) {
                const oldTotalPrice = oldPrice - oldDiscount
                const newTotalPrice = course.price - course.discount

                if(oldTotalPrice !== newTotalPrice) {
                    const baskets = await basketModel.find({'courses.courseId' : courseId})
                    
                    baskets.forEach(basket => {
                        const basketCourse = basket.courses.find(item => item.courseId.toString() === courseId)
                        basketCourse.price = newTotalPrice
                        basket.totalPrice += (newTotalPrice - oldTotalPrice)
                        basket.save()  
                    })
                }

            }

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'course edited successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
}

export default new CourseController()