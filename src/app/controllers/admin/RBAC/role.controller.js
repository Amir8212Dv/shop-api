import roleModel from '../../../models/roles.js'
import httpStatus from 'http-status-codes'
import createHttpError from 'http-errors'
import permissionModel from '../../../models/permissions.js'
import {createRoleValidationSchema} from '../../../validators/admin/role.js'
import stringToArray from '../../../utils/stringToArray.js'
import validateObjectId from '../../../validators/objectId.js'


//create check permission exists in utils folder

//create check category exists in utils folder

class roleController {

    async createRole(req , res , next) {
        try {
            
            const roleData = req.body
            stringToArray(roleData.permissions)

            await createRoleValidationSchema.validateAsync(roleData)
            await (async () => {    
                if(roleData.permissions.length) {
                    roleData.permission.map(async permission => {
                        const checkPermissionExists = await permissionModel.findById(permission)
                        if(!checkPermissionExists) throw createHttpError.BadRequest(`permission with id : ${permission} not found`)
                    })
                }

            })()

            const role = await roleModel.create(roleData)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'role created successfully',
                data : {
                    role : [
                        role
                    ]
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllRoles(req , res , next) {
        try {
            
            const roles = await roleModel.find({})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteRoleByTitle(req , res , next) {
        try {
            const {roleId} = req.params
            await validateObjectId.validateAsync(roleId)

            const deleteRole = await roleModel.deleteOne({_id : roleId})

            if(!deleteRole.acknowledged) throw createHttpError.BadRequest('role not found')
            if(+deleteRole.deletedCount === 0) throw createHttpError.InternalServerError('delete role faild')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'role deleted successfully',
                data : {}
            })

            
        } catch (error) {
            next(error)
        }
    }

}

export default new roleController()