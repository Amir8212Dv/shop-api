import autoBind from "auto-bind"
import courseModel from "../../../models/courses.js"
import {createChapterValidationSchema , updateChapterValidationSchema} from "../../../validators/admin/chapter.js"
import httpStatus from 'http-status-codes'
import createHttpError from "http-errors"
import validateObjectId from "../../../validators/objectId.js"


// re-write  delete methods in all projects



class chapterController {

    constructor(){
        autoBind(this)
    }

    async addChapter(req , res , next) {
        try {
            await createChapterValidationSchema.validateAsync(req.body)
            const {id , title , text} = req.body

            const course = await courseModel.findByIdAndUpdate(id , {$push : {chapters : {title , text}}} , {returnDocument : 'after'})

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'chapter added to course successfully',
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
    async getAllChaptersOfCourse(req , res , next) {
        try {
            const {courseId} = req.params
            await validateObjectId.validateAsync(courseId)

            const course = await courseModel.findById(courseId , {chapters : 1})
            if(!course) throw createHttpError.NotFound('course not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    chapter : course.chapters
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getChapterById(req , res , next) {
        try {
            const {chapterId} = req.params
            
            const {chapters} = await courseModel.findOne({'chapters._id' : chapterId} , {'chapters.$' : 1})
            if(!chapters) throw createHttpError.NotFound('chapter not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    chapter : chapters
                }
            })
            

        } catch (error) {
            next(error)
        }
    }
    async editChapter(req , res , next) {
        try {
            const {chapterId} = req.params
            const data = req.body
            
            await validateObjectId.validateAsync(chapterId)
            await updateChapterValidationSchema.validateAsync(data)
            
            const {chapters} = await courseModel.findOneAndUpdate(
                {'chapters._id' : chapterId} , 
                {'chapters.$' : data} , 
                {returnDocument : 'after'}
            )
            if(!chapters) throw createHttpError.NotFound('chapter not found')


            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'chapter updated successfully',
                data : {
                    chapters
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async deleteChapter(req , res , next) {
        try {
            
            const {chapterId} = req.params
            await validateObjectId.validateAsync(chapterId)

            const course = await courseModel.updateOne({'chapters._id' : chapterId} , {$pull : {chapters : {_id : chapterId}}} , {returnDocument : 'after'})
            console.log(course)
            if(!course.matchedCount) throw createHttpError.NotFound('chapter not found')
            if(!course.modifiedCount) throw createHttpError.InternalServerError('delete chapter faild')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'chapter deleted successfully',
                data : {}
            })

        } catch (error) {
            next(error)
        }
    }
} 


export default new chapterController()