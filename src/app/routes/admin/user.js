import express from 'express'
import userController from '../../controllers/admin/user/user.controller.js'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'

const userRouter = express.Router()

userRouter.get('/all'  , checkRole(permissions.ADMIN) , userController.getAllUsers)
userRouter.get('/getProfile' , userController.getProfile)


export default userRouter