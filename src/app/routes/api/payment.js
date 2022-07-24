import express from 'express'
import PaymentController from '../../controllers/api/payment.controller.js'

const paymentRouter = express.Router()

paymentRouter.post('payment' , PaymentController.paymentGateway)
paymentRouter.get('verify' , PaymentController.paymentVerify)

export default paymentRouter