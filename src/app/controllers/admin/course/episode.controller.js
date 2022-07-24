import courseModel from "../../../models/courses.js"
import httpStatus from 'http-status-codes'
import { createEpisodeValidationSchema, updateEpisodeValidationSchema } from '../../../validators/admin/episode.js'
import createFileLink from "../../../utils/createImageLink.js"
import {getVideoDurationInSeconds} from 'get-video-duration'
import validateObjectId from '../../../validators/objectId.js'
import episodeModel from "../../../models/course.chapter.episodes.js"
import chapterModel from "../../../models/course.chapters.js"
import { createInternalServerError, createNotFoundError } from "../../../utils/createError.js"



class EpisodeController {

    async createEpisode(req , res , next) {
        try {
            const videoAddress = (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            const time = await getVideoDurationInSeconds(createFileLink(req , videoAddress))
            const episodeData = req.body
            await createEpisodeValidationSchema.validateAsync(episodeData)


            episodeData.time = time
            episodeData.videoAddress = videoAddress

            const chapter = await chapterModel.findById(episodeData.chapterId)
            createNotFoundError({chapter})   
            createNotFoundError({course: chapter.courseId.toString() === episodeData.courseId})

            const episode = await episodeModel.create(episodeData)
            createInternalServerError(episode)

            chapter.episodes.push(episode._id)
            chapter.save()
            const updateCourse = await courseModel.updateOne({_id : episode.courseId} , {$inc : {time}})

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'new episode added successfully',
                data : {
                    episode
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

            const episode = await episodeModel.findById(episodeId)
            createNotFoundError({episode})
            const deleteEpisode = await episodeModel.deleteOne({_id : episodeId})
            createInternalServerError(deleteEpisode.deletedCount)

            deleteFile(path.join(process.argv[1] , '..' , '..' , 'public' , episode.videoAddress))

            const updateChapter = await chapterModel.updateOne({_id : episode.chapterId} , {$pull : {episodes : episode._id}})
            const updateCourse = await courseModel.updateOne({_id : episode.courseId} , {$inc : {time : -episode.time}})


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
            const updateData = req.body
            await updateEpisodeValidationSchema.validateAsync(updateData)

            const episode = await episodeModel.updateOne({_id : episodeId} , updateData)
            createNotFoundError({episode})
            createInternalServerError(episode.modifiedCount)
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'episode updated successfully',
                data : {}
            })

        } catch (error) {
            next(error)
        }
    }
}

export default new EpisodeController()