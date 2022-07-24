import permissionModel from '../../../models/permissions.js'
import httpStatus from 'http-status-codes'
import { createPermissionValidationSchema,updatePermissionValidationSchema } from '../../../validators/admin/permission.js'
import validateObjectId from '../../../validators/objectId.js'
import { createInternalServerError, createNotFoundError } from '../../../utils/createError.js'


class PermissionController {
    async createPermission(req , res , next) {
        try {
            
            const permissionData = req.body
            await createPermissionValidationSchema.validateAsync(permissionData)

            const permission = await permissionModel.create(permissionData)
            createInternalServerError(permission)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'permission created successfully',
                data : {
                    permission
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
            const {permissionId} = req.params
            await validateObjectId.validateAsync(permissionId)

            const permission = await permissionModel.findById(permissionId)
            createNotFoundError({permission})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    permission
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async deletePermission(req , res , next) {
        try {
            
            const {permissionId} = req.params
            await validateObjectId.validateAsync(permissionId)

            const permission = await permissionModel.deleteOne({_id : permissionId})
            createNotFoundError({permission})
            createInternalServerError(permission.deletedCount)

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'permission deleted successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
    async editPermission(req , res , next) {
        try {
            const {permissionId} = req.params
            const updateData = req.body

            await validateObjectId.validateAsync(permissionId)
            await updatePermissionValidationSchema.validateAsync(updateData)

            const permission = await permissionModel.updateOne({_id : permissionId} , updateData)
            createNotFoundError({permission})
            createInternalServerError(permission.modifiedCount)

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'permission updated successfully',
                data : {}
            })

            
        } catch (error) {
            next(error)
        }
    }
}

export default new PermissionController()