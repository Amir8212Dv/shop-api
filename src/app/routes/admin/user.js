import express from 'express'
import userController from '../../controllers/admin/user/user.controller.js'

const userRouter = express.Router()

userRouter.get('/all' , userController.getAllUsers)
userRouter.get('/getProfile' , userController.getProfile)


export default userRouter