import express from 'express'
import authController from '../../controllers/user/auth.controller.js'

const router = express.Router()
router.post('/signup' , authController.signUp)
router.post('/check-otp' , authController.checkOtp)
router.post('/login-password' , authController.loginWithPassword)
router.post('/login-otp' , authController.loginWithOtp)
router.post('/refresh-token' , authController.refreshToken)


export default router