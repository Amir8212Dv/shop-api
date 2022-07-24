import express from 'express'
import RoomController from '../../controllers/support/room.controller.js'
import { imageUpload } from '../../middlewares/multer.js'

const roomRouter = express.Router()

roomRouter.post('/create/:namespaceId' , imageUpload.single('image') , RoomController.createRoom)
roomRouter.get('/all/:namespaceId' , RoomController.getAllRooms)
roomRouter.patch('/edit/:roomId' , RoomController.editRoom)
roomRouter.delete('/delete/:roomId' , RoomController.deleteRoom)



export default roomRouter