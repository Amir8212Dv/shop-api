import courseModel from "../../../models/courses.js"
import createHttpError from "http-errors"
import httpStatus from 'http-status-codes'
import { createEpisodeValidationSchema, updateEpisodeValidationSchema } from '../../../validators/admin/episode.js'
import createFileLink from "../../../utils/createImageLink.js"
import {getVideoDurationInSeconds} from 'get-video-duration'
import validateObjectId from '../../../validators/objectId.js'
import episodeModel from "../../../models/course.chapter.episodes.js"
import chapterModel from "../../../models/course.chapters.js"
import deleteFile from "../../../utils/deleteFiles.js"



class EpisodeController {

    async addEpisode(req , res , next) {
        try {
            const videoAddress = (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            const time = await getVideoDurationInSeconds(createFileLink(req , videoAddress))
            const episodeData = req.body
            await createEpisodeValidationSchema.validateAsync(episodeData)

            // await updateEpisodeValidationSchema.validateAsync(req.body)

            episodeData.time = time
            episodeData.videoAddress = videoAddress
            // const course = await courseModel.findOne({_id : courseId , 'chapters._id' : chapterId})

            const chapter = await chapterModel.findById(episodeData.chapterId)
            createNotFoundError({chapter})   
            if(chapter.courseId.toString() !== episodeData.courseId) throw createHttpError.NotFound('course not found')

            const episode = await episodeModel.create(episodeData)
            if(!episode) throw createHttpError.InternalServerError('create episode faild')

            chapter.episodes.push(episode._id)
            chapter.save()
            const updateCourse = await courseModel.updateOne({_id : episode.courseId} , {$inc : {time}})

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'new episode added successfully',
                data : {
                    episode : [
                        episode
                    ]
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    async deleteEpisode(req , res , next) {
        try {
            const { episodeId } = req.params
            await validateObjectId.validateAsync(episodeId)

            const episode = await episodeModel.findByIdAndDelete(episodeId , {chapterId : 1})

            createNotFoundError({episode})

            const updateChapter = await chapterModel.updateOne({_id : episode.chapterId} , {$pull : {episodes : episode._id}})
            const updateCourse = await courseModel.updateOne({_id : episode.courseId} , {$inc : {time : -episode.time}})

            deleteFile(episode.videoAddress)

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'episode deleted successfully',
                data : {}
            })

        } catch (error) {
            next(error)
        }
    }
    async editEpisode(req , res , next) {
        try {
            const { episodeId } = req.params
            await validateObjectId.validateAsync(episodeId)

            const data = await updateEpisodeValidationSchema.validateAsync(req.body)

            const episode = await episodeModel.findByIdAndUpdate(episodeId , data , {returnDocument : 'after'})
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'episode updated successfully',
                data : {
                    episode
                }
            })

        } catch (error) {
            next(error)
        }
    }
}

export default new EpisodeController()