import express from 'express'
import UserController from '../../controllers/admin/user/user.controller.js'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'

const userRouter = express.Router()

userRouter.get('/all'  , checkRole(permissions.ADMIN) , UserController.getAllUsers)
userRouter.get('/getProfile' , UserController.getProfile)
userRouter.patch('/edit' , UserController.editUser)

export default userRouter