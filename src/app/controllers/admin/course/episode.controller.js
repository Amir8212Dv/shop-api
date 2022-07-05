import courseModel from "../../../models/courses.js"
import createHttpError from "http-errors"
import httpStatus from 'http-status-codes'
import { createEpisodeValidationSchema } from '../../../validators/admin/episode.js'
import createFileLink from "../../../utils/createImageLink.js"
import {getVideoDurationInSeconds} from 'get-video-duration'
import validateObjectId from '../../../validators/objectId.js'



// increase and decrease  full time of course when adding and deleting episodes



class episodeController {

    async addEpisode(req , res , next) {
        try {
            const videoAddress = (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            const time = await getVideoDurationInSeconds(createFileLink(req , videoAddress))
            const {title , type , text , courseId , chapterId} = req.body

            await createEpisodeValidationSchema.validateAsync(req.body)

            const episode = {title , type , text , time , videoAddress}
            const course = await courseModel.findOne({_id : courseId , 'chapters._id' : chapterId})
            console.log(course)
            const updatedCourse = await courseModel.updateOne(
                {_id : courseId , 'chapters._id' : chapterId},
                {$push : {'chapters.$.episodes' : episode }},
                {returnDocument : 'after'}
            )
            if(+updatedCourse.matchedCount === 0) throw createHttpError.BadRequest('course or chapter not found')
            if(+updatedCourse.modifiedCount === 0) throw createHttpError.InternalServerError('add episode faild')

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'new episode added successfully',
                data : {
                    
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

            const course = await courseModel.updateOne(
                {'chapters.episodes._id' : episodeId},
                {$pull : {'chapters.$.episodes' : {_id : episodeId}}}
            )
            if(+course.matchedCount === 0) throw createHttpError.BadRequest('episode not found')
            if(+course.modifiedCount === 0) throw createHttpError.InternalServerError('delete episode faild')
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'episode deleted successfully'
            })

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default new episodeController()