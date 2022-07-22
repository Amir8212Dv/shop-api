import userModel from '../../../models/users.js'
import httpStatus from 'http-status-codes'
import { updateUserValidationSchema } from '../../../validators/admin/user.js'


class UserController {
    
    async getAllUsers(req , res , next) {
        try {

            const filter = req.query.search ? {$text : {$search : req.query.search}} : {}

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

            const user = await userModel.findByIdAndUpdate(userId , updateData , {returnDocument : 'after'})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'user updated successfully',
                data : {
                    user : [
                        user
                    ]
                }
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
                    user : [
                        user
                    ]
                }
            })

        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()