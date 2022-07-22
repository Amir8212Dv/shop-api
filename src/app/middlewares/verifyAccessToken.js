import httpError from 'http-errors'
import jwt from 'jsonwebtoken'
import userModel from '../models/users.js'

const jwtValidation = async jwtCode => {
    if(!jwtCode) throw new httpError.Unauthorized('please login again')
    const [bearer , token] = jwtCode.split(' ')
    if(token && bearer.toLowerCase() === 'bearer') {    
        const {mobile} = jwt.verify(token , process.env.JWT_SECRETE_KEY)
        const user = await userModel.findOne({mobile} , {otp : 0 , __v : 0})
        if(!user) throw httpError.Unauthorized('user not found')
        return user
    }
    throw new httpError.Unauthorized('please login again')
}

const verifyAccessToken = async (req , res , next) => {
    try {
        // const [bearer , token] = req.headers.authorization.split(' ')
        // if(token && bearer.toLowerCase() === 'bearer') {    
        //     const {mobile} = jwt.verify(token , process.env.JWT_SECRETE_KEY || 'jsonwebtoken')
        //     const user = await userModel.findOne({mobile} , {otp : 0 , __v : 0})
        //     if(!user) throw httpError.Unauthorized('user not found')

        //     req.user = user
        // }
        const user = await jwtValidation(req.headers.authorization)
        req.user = user
        next()
        
    } catch {
        next(httpError.Unauthorized('please login again'))
    }
}


export const verifyAccessTokenGraphQL = async (req) => {
    // if(!req.headers.authorization) throw new httpError.Unauthorized('please login again')
    // const [bearer , token] = req.headers.authorization.split(' ')
    // if(token && bearer.toLowerCase() === 'bearer') {    
    //     const {mobile} = jwt.verify(token , process.env.JWT_SECRETE_KEY || 'jsonwebtoken')
    //     const user = await userModel.findOne({mobile} , {otp : 0 , __v : 0})
    //     if(user) return req.user = user
    // }
    
    // throw httpError.Unauthorized('please login again')
    const user = await jwtValidation(req.headers.authorization)
    req.user = user
}

export const verifyAccessTokenFromCookie = async (req , res , next) => {
    try {
        const jwtCode = req.signedCookies
        // ('authorization' , process.env.COOKIE_JWT_SECRETE_KEY || 'cookiesecretekey')
        const user = await jwtValidation(jwtCode.authorization)
        res.cookie('userId' , user._id.toString())
        next()
        
    } catch (error) {
        next(error)
    }
}

export default verifyAccessToken