import courseModel from "../../../models/courses.js"
import createHttpError from "http-errors"
import httpStatus from 'http-status-codes'
import { createEpisodeValidationSchema, updateEpisodeValidationSchema } from '../../../validators/admin/episode.js'
import createFileLink from "../../../utils/createImageLink.js"
import {getVideoDurationInSeconds} from 'get-video-duration'
import validateObjectId from '../../../validators/objectId.js'
import episodeModel from "../../../models/course.chapter.episodes.js"
import chapterModel from "../../../models/course.chapters.js"



// increase and decrease  full time of course when adding and deleting episodes



class episodeController {

    async addEpisode(req , res , next) {
        try {
            const videoAddress = (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            const time = await getVideoDurationInSeconds(createFileLink(req , videoAddress))
            const {title , type , text , courseId , chapterId} = await createEpisodeValidationSchema.validateAsync(req.body)

            // await updateEpisodeValidationSchema.validateAsync(req.body)

            const episodeData = {title , type , text , time , videoAddress , courseId , chapterId}
            // const course = await courseModel.findOne({_id : courseId , 'chapters._id' : chapterId})

            const chapter = await chapterModel.findById(chapterId)
            if(!chapter) throw createHttpError.BadRequest('chapter not found')
            if(chapter.courseId.toString() !== courseId) throw createHttpError('course not found')

            const episode = await episodeModel.create(episodeData)
            if(!episode) throw createHttpError.InternalServerError('create episode faild')

            chapter.episodes.push(episode._id)
            chapter.save()

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

            if(!episode) throw createHttpError.BadRequest('episode not found')

            const chapter = await chapterModel.updateOne({_id : episode.chapterId} , {$pull : {episodes : episode._id}})
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'episode deleted successfully'
            })

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async editEpisode(req , res , next) {
        try {
            const { episodeId } = req.params
            await validateObjectId.validateAsync(episodeId)

            const data = await updateEpisodeValidationSchema.validateAsync(req.body)

            const episode = await episodeModel.findByIdAndUpdate(episodeId , data , {returnDocument : 'after'})
            if(!episode) throw createHttpError.BadRequest('episode not found')
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'episode updated successfully',
                data : {
                    episode
                }
            })

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default new episodeController()