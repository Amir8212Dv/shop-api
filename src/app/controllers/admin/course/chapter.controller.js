import autoBind from "auto-bind"
import courseModel from "../../../models/courses.js"
import {createChapterValidationSchema , updateChapterValidationSchema} from "../../../validators/admin/chapter.js"
import httpStatus from 'http-status-codes'
import createHttpError from "http-errors"
import validateObjectId from "../../../validators/objectId.js"
import chapterModel from "../../../models/course.chapters.js"
import episodeModel from "../../../models/course.chapter.episodes.js"
import { createNotFoundError } from "../../../utils/createError.js"



class ChapterController {

    constructor(){
        autoBind(this)
    }

    async addChapter(req , res , next) {
        try {
            await createChapterValidationSchema.validateAsync(req.body)
            const chapterData = req.body

            // const course = await courseModel.findById(chapterData.courseId)
            // createNotFoundError({course})
            
            const chapter = await chapterModel.create(chapterData)
            const course = await courseModel.updateOne({_id : chapterData.courseId}, {$push : {chapters : chapter._id}})
            
            // course.chapters.push(chapter._id)
            // course.save()

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'chapter added to course successfully',
                data : {
                    chapter : [
                        chapter
                    ]
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    // async getAllChaptersOfCourse(req , res , next) {
    //     try {
    //         const {courseId} = req.params
    //         await validateObjectId.validateAsync(courseId)

    //         const chapters = await chapterModel.find({courseId})
    //         // if(!course) throw createHttpError.NotFound('course not found')

    //         res.status(httpStatus.OK).send({
    //             status : httpStatus.OK,
    //             message : '',
    //             data : {
    //                 chapters
    //             }
    //         })
            
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    // async getChapterById(req , res , next) {
    //     try {
    //         const {chapterId} = req.params
            
    //         const chapter = await chapterModel.findById(chapterId)
    //         if(!chapter) throw createHttpError.NotFound('chapter not found')

    //         res.status(httpStatus.OK).send({
    //             status : httpStatus.OK,
    //             message : '',
    //             data : {
    //                 chapter : [
    //                     chapter
    //                 ]
    //             }
    //         })
            

    //     } catch (error) {
    //         next(error)
    //     }
    // }
    async editChapter(req , res , next) {
        try {
            const {chapterId} = req.params
            const data = req.body
            
            await validateObjectId.validateAsync(chapterId)
            await updateChapterValidationSchema.validateAsync(data)
            
            const chapter = await chapterModel.findByIdAndUpdate(chapterId , data , {returnDocument : 'after'})
            createNotFoundError({chapter})


            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'chapter updated successfully',
                data : {
                    chapter : [
                        chapter
                    ]
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

            const chapter = await chapterModel.findByIdAndDelete(chapterId)
            createNotFoundError({chapter})
            
            const deleteEpisodes = await episodeModel.deleteMany({chapterId})
            const updateCourse = await courseModel.findByIdAndUpdate(chapter.courseId , {$pull : {chapters : chapterId}})


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


export default new ChapterController()