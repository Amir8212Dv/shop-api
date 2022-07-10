import userModel from '../../../models/users.js'
import httpStatus from 'http-status-codes'


class userController {
    
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
    async updateUser(req , res , next) {
        try {
            ///// write codes ...
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

export default new userController()