import express from 'express'
import episodeController from '../../controllers/admin/course/episode.controller.js'
import { imageUpload , videoUpload } from '../../middlewares/multer.js'

const episodeRouter = express.Router()

episodeRouter.put('/add' , videoUpload.single('video') , episodeController.addEpisode)

episodeRouter.delete('/delete/:episodeId' , episodeController.deleteEpisode)

episodeRouter.patch('/edit/:episodeId' , videoUpload.single('video') , episodeController.editEpisode)

export default episodeRouter