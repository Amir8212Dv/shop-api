import userModel from '../../../models/users.js'
import httpStatus from 'http-status-codes'
import { updateUserValidationSchema } from '../../../validators/admin/user.js'
import { hashPassword } from '../../../utils/hashPassword.js'
import { createInternalServerError } from '../../../utils/createError.js'


class UserController {
    
    async getAllUsers(req , res , next) {
        try {

            const {search , userId} = req.query
            const filter = search ? {$text : {$search : search}} : userId ? {_id : userId} : {}

            const users = await userModel.find(filter)

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    users
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async editUser(req , res , next) {
        try {
            
            const userId = req.user._id
            const updateData = req.body

            await updateUserValidationSchema.validateAsync(updateData)

            if(updateData.password) updateData.password = hashPassword(updateData.password)

            const user = await userModel.updateOne({_id : userId} , updateData)
            createInternalServerError(user.modifiedCount)

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'user profile updated successfully',
                data : {}
            })

        } catch (error) {
            next(error)
        }
    }
    async getProfile(req , res , next) {
        try {
            
            const user = req.user

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    user
                }
            })

        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()