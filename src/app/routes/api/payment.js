import express from 'express'
import paymentController from '../../controllers/api/payment.controller.js'

const paymentRouter = express.Router()

paymentRouter.post('payment' , paymentController.paymentGateway)

paymentRouter.get('verify' , paymentController.paymentVerify)

export default paymentRouter