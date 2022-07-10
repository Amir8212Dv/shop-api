import httpError from 'http-errors'
import jwt from 'jsonwebtoken'
import userModel from '../models/users.js'

const verifyAccessToken = async (req , res , next) => {
    try {
        const [bearer , token] = req.headers.authorization.split(' ')
        if(token && bearer.toLowerCase() === 'bearer') {    
            const {mobile} = jwt.verify(token , process.env.SECRETE_KEY || 'jsonwebtoken')
            const user = await userModel.findOne({mobile} , {otp : 0 , __v : 0})
            if(!user) throw httpError.Unauthorized('user not found')

            req.user = user
            return next()
        }

        throw ''
    } catch {
        next(httpError.Unauthorized('please login again'))
    }
}


export const verifyAccessTokenGraphQL = async (req) => {
    if(!req.headers.authorization) throw new httpError.Unauthorized('please login again')
    const [bearer , token] = req.headers.authorization.split(' ')
    if(token && bearer.toLowerCase() === 'bearer') {    
        const {mobile} = jwt.verify(token , process.env.SECRETE_KEY || 'jsonwebtoken')
        const user = await userModel.findOne({mobile} , {otp : 0 , __v : 0})
        if(user) return req.user = user
    }
    
    throw httpError.Unauthorized('please login again')

}

export default verifyAccessToken