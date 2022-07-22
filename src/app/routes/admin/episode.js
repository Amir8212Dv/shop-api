import express from 'express'
import EpisodeController from '../../controllers/admin/course/episode.controller.js'
import { checkForCourseId , checkForEpisodeId } from '../../middlewares/checkForObjectId.js'
import checkRole from '../../middlewares/checkRole.js'
import { imageUpload , videoUpload } from '../../middlewares/multer.js'
import { permissions } from '../../utils/constants.js'

const episodeRouter = express.Router()

episodeRouter.put(
    '/add' , 
    checkRole(permissions.TEACHER) ,
    checkForCourseId, 
    videoUpload.single('video') , 
    EpisodeController.createEpisode
)

episodeRouter.delete('/delete/:episodeId' , checkRole(permissions.TEACHER) , EpisodeController.deleteEpisode)

episodeRouter.patch(
    '/edit/:episodeId' , 
    checkRole(permissions.TEACHER) ,
    checkForEpisodeId,
    videoUpload.single('video') , 
    EpisodeController.editEpisode
)



export default episodeRouter