import express from 'express'
import roomController from '../../controllers/support/room.controller.js'
import { imageUpload } from '../../middlewares/multer.js'

const roomRouter = express.Router()

roomRouter.post('/create/:spaceId' , imageUpload.single('image') , roomController.createRoom)

roomRouter.get('/all/:spaceId' , roomController.getAllRooms)

export default roomRouter