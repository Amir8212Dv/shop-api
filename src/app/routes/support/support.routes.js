import express from 'express'
import supportController from '../../controllers/support/support.controller.js'
import verifyAccessToken, { verifyAccessTokenFromCookie } from '../../middlewares/verifyAccessToken.js'
import namespaceRouter from './namespace.js'
import roomRouter from './room.js'

const supportRouter = express.Router()

supportRouter.get('/' , verifyAccessTokenFromCookie , supportController.renderChattRoom)
supportRouter.use('/namespace' , verifyAccessToken , namespaceRouter)
supportRouter.use('/room' , verifyAccessToken , roomRouter)

export default supportRouter