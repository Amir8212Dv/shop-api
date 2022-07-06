import autoBind from 'auto-bind'
import stringToArray from '../../../utils/stringToArray.js'
import {createCourseValidationSchema , updateCourseValidationSchema} from '../../../validators/admin/course.js'
import courseModel from '../../../models/courses.js'
import createHttpError from 'http-errors'
import httpStatus from 'http-status-codes'
import Controller from '../../controller.js'
import mongoose from 'mongoose'
import validateObjectId from '../../../validators/objectId.js'
import chapterModel from '../../../models/course.chapters.js'
import episodeModel from '../../../models/course.chapter.episodes.js'

// check for tags array to be not an array in string form

// add aggregate or populate for all controllers

// add a check in multer , for check documents existence



class courseController extends Controller {
    #aggregateSchema = [
        this.userLookup('teacher'),
        this.categoryLookup('category'),
        // {
        //     $unwind : '$teacher'
        // },
        // {
        //     $unwind : '$category'
        // },
        {
            $project : {
                'teacher.mobile' : 0,
                'teacher.bills' : 0,
                'teacher.otp' : 0
            }
        }
    ]
    constructor() {
        super()
        autoBind(this)
    }

    async addCourse(req , res , next) {
        try {
            if(req.file) req.body.image = (req.file.path.split('public')[1]).replaceAll('\\' , '/')

            req.body.tags = stringToArray(req.body.tags)

            await createCourseValidationSchema.validateAsync(req.body)
            
            const course = await courseModel.create({...req.body , teacher : req.user._id})
            if(!course) throw createHttpError.InternalServerError()

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'courses created successfully',
                data : {
                    course : [
                        course
                    ]
                }
            })
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async getAllCourses(req , res , next) {
        try {
            const search = req.query.search
            
            // const filter = search ? {$text : {$search : search}} : {}

            const courses = await courseModel.aggregate([
                {
                    $match : {...(search && {$text : {$search : search}})}
                }, 
                ...this.#aggregateSchema,
            ])
            console.log(this.#aggregateSchema)

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    course : courses
                }
            })


        } catch (error) {
            next(error)
        }
    }
    async getCourseById(req , res , next) {
        try {
            const id = mongoose.Types.ObjectId(req.query.id)

            const course = await courseModel.aggregate([
                {
                    $match : {_id : id}
                }, 
                ...this.#aggregateSchema,
            ])
            if(!course) throw createHttpError.BadRequest('course not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    course : [
                        course
                    ]
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async removeCourse(req , res , next) {
        try {

            const {courseId} = req.params
            await validateObjectId.validateAsync(courseId)

            const deleteCourse = await courseModel.deleteOne({_id : courseId})
            if(!deleteCourse.acknowledged) throw createHttpError.BadRequest('course not found')
            if(deleteCourse.deletedCount === 0) throw createHttpError.InternalServerError('delete course faild')

            const deleteChapters = await chapterModel.deleteMany({courseId})
            const deleteEpisodes = await episodeModel.deleteMany({courseId})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'course deleted successfully',
                data : {deleteCourse}
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
        

            const course = await courseModel.findByIdAndUpdate(courseId , updateData , {returnDocument : 'after'})
            if(!course) throw createHttpError.NotFound('course not found')            

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    course : [
                        course
                    ]
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
}

export default new courseController()