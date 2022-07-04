import express from 'express'
import auth from '../../controllers/user/auth.controller.js'

const router = express.Router()
router.post('/getOtp' , auth.getOtp)
router.post('/login' , auth.login)
router.post('/refresh-token' , auth.refreshToken)


export default router