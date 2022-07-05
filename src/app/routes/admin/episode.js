import express from 'express'
import episodeController from '../../controllers/admin/course/episode.controller.js'
import { imageUpload , videoUpload } from '../../middlewares/multer.js'

const episodeRouter = express.Router()

episodeRouter.post('/add' , videoUpload.single('video') , episodeController.addEpisode)

episodeRouter.delete('/delete/:episodeId' , episodeController.deleteEpisode)

export default episodeRouter