import express from 'express'
import roomController from '../../controllers/support/room.controller.js'

const namespaceRouter = express.Router()

namespaceRouter.post('/create/:spaceId' , roomController.createRoom)

namespaceRouter.get('/all/:spaceId' , roomController.getAllRooms)

export default namespaceRouter