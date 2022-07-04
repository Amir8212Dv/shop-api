import autoBind from 'auto-bind'
import stringToArray from '../../../utils/stringToArray.js'
import courseValidationSchema from '../../../validators/admin/course.js'
import courseModel from '../../../models/courses.js'
import createHttpError from 'http-errors'
import httpStatus from 'http-status-codes'


// check for tags array to be not an array in string form



class courseController {
    #aggregateSchema = []
    constructor() {
        autoBind(this)
    }

    async addCourse(req , res , next) {
        try {
            console.log(req.body)
            req.body.tags = stringToArray(req.body.tags)

            await courseValidationSchema.validateAsync(req.body)
            
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
            next(error)
        }
    }
    async getAllCourses(req , res , next) {
        try {
            const search = req.query.search
            
            const filter = search ? {$text : {$search : search}} : {}

            const courses = await courseModel.find(filter)

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    courses
                }
            })


        } catch (error) {
            next(error)
        }
    }
    async getCourseById(req , res , next) {
        try {
            const id = req.query.id

            const course = await courseModel.findById(id)
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
            const course = ''
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
    async editCourse(req , res , next) {
        try {
            const course = ''
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
    async addImage(req , res , next) {
        try {
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
        
                }
            })

        } catch (error) {
            next(error)
        }
    }

}

export default new courseController()