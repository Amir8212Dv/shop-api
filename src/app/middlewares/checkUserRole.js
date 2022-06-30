import createHttpError from "http-errors"


export const checkAdminRoler = async (req , res , next) => {
    try {
        console.log(req.user)
        if(req.user.roles.includes('ADMIN')) return next()


        throw createHttpError.Unauthorized('access denied')

    } catch (error) {
        next(error)
    }
}