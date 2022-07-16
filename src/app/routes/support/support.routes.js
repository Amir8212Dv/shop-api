import express from 'express'
import supportController from '../../controllers/support/support.controller.js'
import namespaceRouter from './namespace.js'
import roomRouter from './room.js'

const supportRouter = express.Router()

supportRouter.get('/' , supportController.renderChattRoom)

supportRouter.use('/namespace' , namespaceRouter)

supportRouter.use('/room' , roomRouter)

export default supportRouter