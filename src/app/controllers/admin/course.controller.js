import autoBind from 'auto-bind'
import stringToArray from '../../utils/stringToArray.js'
import courseSchema from '../../validators/admin/course.js'
import courseModel from '../../models/courses.js'
import createHttpError from 'http-errors'


class courseController {
    #aggregateSchema = []
    constructor() {
        autoBind(this)
    }

    async addCourse(req , res , next) {
        try {
            req.tags = stringToArray(req.tags)

            await courseSchema.validateAsync(req.body)
            
            const course = await courseModel.create({...req.body , teacher : req.user._id})
            if(!course) throw createHttpError.InternalServerError()

            res.statu(201).send({
                status : 201,
                course
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

            res.status(200).send({
                status : 200,
                courses
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

            res.status(200).send({
                status : 200,
                course
            })

        } catch (error) {
            next(error)
        }
    }
    async removeCourse(req , res , next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    async editCourse(req , res , next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    async addImage(req , res , next) {
        try {

        } catch (error) {
            next(error)
        }
    }

}

export default new courseController()