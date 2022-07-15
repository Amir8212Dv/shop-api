import express from 'express'
import supportController from '../controllers/support/support.controller.js'

const supportRouter = express.Router()

supportRouter.get('/' , supportController.renderChattRoom)

export default supportRouter