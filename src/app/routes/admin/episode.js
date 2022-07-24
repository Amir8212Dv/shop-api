import express from 'express'
import EpisodeController from '../../controllers/admin/course/episode.controller.js'
import { checkForCourseId , checkForEpisodeId } from '../../middlewares/checkForObjectId.js'
import checkRole from '../../middlewares/checkRole.js'
import { videoUpload } from '../../middlewares/multer.js'
import { permissions } from '../../utils/constants.js'

const episodeRouter = express.Router()

episodeRouter.put(
    '/create' , 
    checkRole(permissions.TEACHER) ,
    videoUpload.single('video') , 
    checkForCourseId, 
    EpisodeController.createEpisode
)
episodeRouter.patch(
    '/edit/:episodeId' , 
    checkRole(permissions.TEACHER) ,
    checkForEpisodeId,
    videoUpload.single('video') , 
    EpisodeController.editEpisode
)
episodeRouter.delete('/delete/:episodeId' , checkRole(permissions.TEACHER) , EpisodeController.deleteEpisode)


export default episodeRouter