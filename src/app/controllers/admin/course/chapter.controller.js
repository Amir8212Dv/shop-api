import courseModel from "../../../models/courses.js"
import {createChapterValidationSchema , updateChapterValidationSchema} from "../../../validators/admin/chapter.js"
import httpStatus from 'http-status-codes'
import validateObjectId from "../../../validators/objectId.js"
import chapterModel from "../../../models/course.chapters.js"
import episodeModel from "../../../models/course.chapter.episodes.js"
import { createInternalServerError, createNotFoundError } from "../../../utils/createError.js"



class ChapterController {


    async createChapter(req , res , next) {
        try {
            await createChapterValidationSchema.validateAsync(req.body)
            const chapterData = req.body
            
            const chapter = await chapterModel.create(chapterData)
            createInternalServerError(chapter)
            const course = await courseModel.updateOne({_id : chapterData.courseId}, {$push : {chapters : chapter._id}})
            createInternalServerError(course.modifiedCount)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'chapter added to course successfully',
                data : {
                    chapter
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
            
            const chapter = await chapterModel.updateOne(chapterId , data)
            createNotFoundError({chapter})
            createInternalServerError(chapter.modifiedCount)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'chapter updated successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
    async deleteChapter(req , res , next) {
        try {
            
            const {chapterId} = req.params
            await validateObjectId.validateAsync(chapterId)

            const chapter = await chapterModel.deleteOne({_id : chapterId})
            createNotFoundError({chapter})
            createInternalServerError(chapter.deletedCount)
            
            const deleteEpisodes = await episodeModel.deleteMany({chapterId})
            const updateCourse = await courseModel.updateOne({chapters : chapterId} , {$pull : {chapters : chapterId}})


            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'chapter and sub episodes deleted successfully',
                data : {}
            })

        } catch (error) {
            next(error)
        }
    }
} 


export default new ChapterController()