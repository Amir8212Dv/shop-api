import httpError from 'http-errors'
import jwt from 'jsonwebtoken'
import userModel from '../models/users.js'

const verifyAccessToken = async (req , res , next) => {
    try {
        const [bearer , token] = req.headers.authorization.split(' ')
        
        if(token && bearer.toLowerCase() === 'bearer') {
            const x = jwt.decode(token , 'jsonwebtoken') 
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

export default verifyAccessToken