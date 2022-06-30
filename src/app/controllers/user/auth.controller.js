import { userSchema } from "../../validators/user/auth.schema.js"
import httpError from 'http-errors'
import joi from 'joi'
import validator from 'validator'
import userModel from "../../models/users.js"
import createToken from "../../utils/createAccessToken.js"
import createRandomNumber from '../../utils/randomNumber.js'
import { createRefreshToken, validateRefreshToken } from "../../utils/refreshToken.js"

class Auth {
    async getOtp(req , res , next) {
        try {
            // const user = await userSchema.validateAsync(req.body)
            const mobile = req.body.mobile

            if(!(validator.isMobilePhone(mobile))) throw httpError.BadRequest('invalid data')
            
            const code = createRandomNumber()
            const user = await userModel.findOne({mobile})
            console.log(code)
            const expire = new Date().getTime() + 120000
            if(!user) {
                await userModel.create({mobile , otp : {code , expire} , roles : ['USER']})
            } else {
                await userModel.updateOne({mobile} , {otp : {code , expire}})
            }
            res.status(201).send({
                status : 201,
                success : true,
                message : 'otp sended successfully'
            })

        } catch (error) {
            next(httpError.BadRequest(error.message))
        }
    }
    async login(req , res , next) {
        try {
            const {code , mobile} = req.body

            const time = new Date().getTime()

            const user = await userModel.findOne({mobile})
            if(user.otp.code !== +code || user.otp.expire < time) throw httpError.BadRequest('otp is wrong')

            const accessToken = await createToken({mobile})
            const refreshToken = await createRefreshToken({mobile} , user._id)
            
            res.send({
                status : 200,
                success : true,
                data : {
                    accessToken,
                    refreshToken
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req , res , next) {
        try {
            const refreshToken = req.body.refreshToken
    
            const mobile = await validateRefreshToken(refreshToken)
    
            const user = await userModel.findOne({mobile} , {otp : 0 , __v : 0})
            if(!user) throw httpError.Unauthorized('user not found')
    
            const accessToken = await createToken({mobile})
            const newRefreshToken = await createRefreshToken({mobile} , user._id)
    
            res.status(201).send({
                status : 201,
                success : true,
                data : {
                    accessToken,
                    refreshToken : newRefreshToken
                }
            })
            
        } catch (error) {
            next(error)
        }
        

    }

}

export default new Auth()