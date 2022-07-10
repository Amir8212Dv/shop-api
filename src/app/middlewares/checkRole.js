import createHttpError from "http-errors"
import roleModel from "../models/roles.js"
import userModel from "../models/users.js"
import { roles } from "../utils/constants.js"




const checkRole = permissions => async (req , res , next) => {
    try {
        // permissions :  [[1 , 2] , [2 , 4]]
        
        if(!permissions || permissions.length === 0) return next()
        const userId = req.user._id

        const user = await userModel.findById(userId , {role : 1})
        if(user.role === roles.ADMIN) return next()


        const allPermissions = permissions.flat(2)

        
        const [role] = await roleModel.aggregate([
            { 
                $match : {
                    title : user.role
                }
            },
            {
                $lookup : {
                    from : 'permissions',
                    localField : 'permissions',
                    foreignField : 'title',
                    as : 'permissions'
                }
            }
        ])

        for(const per of role.permissions) {
            if(allPermissions.includes(per.title)) return next()
        }
        
        throw createHttpError.Forbidden('access denied')
    } catch (error) {
        next(error)
    }
}

export default checkRole