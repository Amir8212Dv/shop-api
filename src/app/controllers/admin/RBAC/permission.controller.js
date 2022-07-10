import permissionModel from '../../../models/permissions.js'
import httpStatus from 'http-status-codes'
import createHttpError from 'http-errors'
import { createPermissionValidationSchema,updatePermissionValidationSchema } from '../../../validators/admin/permission.js'
import validateObjectId from '../../../validators/objectId.js'



// reFactor codes :  for createError section =>  if(x !== 0) throw -> if(!+x)
// reFactor codes :  for createHttpErrors  => change not found error , to  NotFound() (404)


// new database model for roles 

class permissionController {
    async createPermission(req , res , next) {
        try {
            
            const permissionData = req.body
            await createPermissionValidationSchema.validateAsync(permissionData)

            const permission = await permissionModel.create(permissionData)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'permission created successfully',
                data : {
                    permission : [
                        permission
                    ]
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllPermission(req , res , next) {
        try {
            
            const permissions = await permissionModel.find({})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    permissions
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getPermissionById(req , res , next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async deletePermission(req , res , next) {
        try {
            
            const {permissionId} = req.params
            await validateObjectId.validateAsync(permissionId)

            const deletePermission = await permissionModel.deleteOne({_id : permissionId})

            if(!deletePermission.acknowledged) throw createHttpError.NotFound('permission not found')
            if(!+deletePermission.deletedCount) throw createHttpError.InternalServerError('delete permission faild')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'permission deleted successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
    async updatePermission(req , res , next) {
        try {
            const {permissionId} = req.params
            const updateData = req.body

            await validateObjectId.validateAsync(permissionId)
            await updatePermissionValidationSchema.validateAsync(updateData)

            const updatePermission = await roleModel.findByIdAndUpdate(permissionId , updateData)

            if(!updatePermission) throw createHttpError.NotFound('role not found')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'role updated successfully',
                data : {
                    permission : {
                        updatePermission
                    }
                }
            })

            
        } catch (error) {
            next(error)
        }
    }
}

export default new permissionController()