import jwt from 'jsonwebtoken'
import redis from './initRedis.js'
import userModel from '../models/users.js'
import httpError from 'http-errors'


export const createRefreshToken = async (payload , id) => {
    const refreshToken = jwt.sign(payload , process.env.SECRETE_KEY || 'jsonwebtoken' , {expiresIn : '1y'})

    await redis.SETEX(id.toString() , 365 * 24 * 60 * 60 , refreshToken)

    return refreshToken
}

export const validateRefreshToken = async (token) => {
    const {mobile} = jwt.verify(token , process.env.SECRETE_KEY || 'jsonwebtoken')
    
    const user = await userModel.findOne({mobile})
    if(!user) throw httpError.Unauthorized('user not found')

    const refreshToken = await redis.get(user._id.toString())
    if(refreshToken !== token) throw httpError.Unauthorized('login faild')

    return mobile

}