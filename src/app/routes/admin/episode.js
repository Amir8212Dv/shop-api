import express from 'express'
import episodeController from '../../controllers/admin/course/episode.controller.js'
import { checkForCourseId , checkForEpisodeId } from '../../middlewares/checkForObjectId.js'
import checkRole from '../../middlewares/checkRole.js'
import { imageUpload , videoUpload } from '../../middlewares/multer.js'

const episodeRouter = express.Router()

episodeRouter.put(
    '/add' , 
    checkRole(permissions.TEACHER) ,
    checkForCourseId, 
    videoUpload.single('video') , 
    episodeController.addEpisode
)

episodeRouter.delete('/delete/:episodeId' , checkRole(permissions.TEACHER) , episodeController.deleteEpisode)

episodeRouter.patch(
    '/edit/:episodeId' , 
    checkRole(permissions.TEACHER) ,
    checkForEpisodeId,
    videoUpload.single('video') , 
    episodeController.editEpisode
)



export default episodeRouter