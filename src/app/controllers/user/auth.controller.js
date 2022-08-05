import httpError from 'http-errors'
import userModel from "../../models/users.js"
import createToken from "../../utils/createAccessToken.js"
import createRandomNumber from '../../utils/randomNumber.js'
import { createRefreshToken, validateRefreshToken } from "../../utils/refreshToken.js"
import httpStatus from 'http-status-codes'
import {checkOtpValidationSchema, loginWithOtpValidationSchema, signupUserValidationSchema} from '../../validators/user/auth.js'
import createHttpError from 'http-errors'
import { checkHashedPassword, hashPassword } from '../../utils/hashPassword.js'
import { createNotFoundError } from '../../utils/createError.js'
import basketModel from '../../models/basket.js'


class AuthController {
    async signUp(req , res , next) {
        try {
            const userData = req.body
            await signupUserValidationSchema.validateAsync(userData)

            const checkUserExist = await userModel.findOne({mobile : userData.mobile})
            if(checkUserExist) throw createHttpError.BadRequest('user already signed in')

            const code = createRandomNumber()
            console.log(code)

            const expire = new Date().getTime() + 120000
            userData.otp = {code , expire}
            
            userData.password = hashPassword(userData.password)
            
            const lookupForOtherUsers = userModel.findOne({})
            if(lookupForOtherUsers) userData.role = 'USER'
            else userData.role = 'ADMIN'

            const user = await userModel.create({...userData , role : 'USER'})

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'verification code sended successfully',
                data : {}
            })

        } catch (error) {
            next(httpError.BadRequest(error.message))
        }
    }

    async loginWithMobile(req , res , next) {
        try {
            const data = req.body
            await loginWithOtpValidationSchema.validateAsync(data)

            const user = await userModel.findOne({mobile : data.mobile})
            createNotFoundError({user})

            const code = createRandomNumber()
            console.log(code)

            const expire = new Date().getTime() + 120000
            user.otp = {code , expire}
            await user.save()

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'verification code sended successfully',
                data : {}
            })

        } catch (error) {
            next(error)
        }
    }
    async checkOtp(req , res , next) {
        try {
            const data = req.body
            await checkOtpValidationSchema.validateAsync(data)

            const time = new Date().getTime()

            const user = await userModel.findOne({mobile : data.mobile})

            if(!user.basket) {
                const basket = await basketModel.create({for : user._id})
                user.basket = basket._id
                await user.save()
            }
            createNotFoundError({user})

            if(user.otp.code !== +data.code) throw httpError.BadRequest('verification code is wrong')
            else if(user.otp.expire < time) throw httpError.BadRequest('verification code is expired')

            const accessToken = await createToken({mobile : data.mobile})
            const refreshToken = await createRefreshToken({mobile : data.mobile} , user._id)

            res.cookie('authorization' , `Bearer ${accessToken}` , {signed : true , httpOnly : true , expires : new Date(Date.now() + + (60 * 60 * 24 * 1000))})
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'loged in successfully',
                data : {
                    accessToken,
                    refreshToken
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async loginWithPassword(req , res , next) {
        try {
            const loginData = req.body
            const searchUserBy = loginData.mobile ? {mobile : loginData.mobile} : {email : loginData.email}

            
            const user = await userModel.findOne(searchUserBy)
            createNotFoundError({user})

            const comparePassword = checkHashedPassword(loginData.password , user.password)

            if(!comparePassword) throw createHttpError.Unauthorized(`entered ${loginData.mobile ? 'mobile' : 'email'} or password is wrong`)

            const accessToken = await createToken({mobile : user.mobile})
            const refreshToken = await createRefreshToken({mobile : user.mobile} , user._id)

            res.cookie('authorization' , `Bearer ${accessToken}` , {signed : true , httpOnly : true , expires : new Date(Date.now() + + (60 * 60 * 24 * 1000))})
            
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'loged in successfully',
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
    
            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : '',
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

export default new AuthController()