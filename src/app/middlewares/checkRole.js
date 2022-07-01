import createHttpError from "http-errors"


const checkRole = (role) => (req , res , next) => {
    try {
        if(req.user.roles.includes(role)) return next()

        throw createHttpError.Forbidden('access denied')
    } catch (error) {
        next(error)
    }
}

export default checkRole