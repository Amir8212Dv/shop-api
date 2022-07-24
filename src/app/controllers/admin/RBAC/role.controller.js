import roleModel from '../../../models/roles.js'
import httpStatus from 'http-status-codes'
import createHttpError from 'http-errors'
import {createRoleValidationSchema , updateRoleValidationSchema} from '../../../validators/admin/role.js'
import stringToArray from '../../../utils/stringToArray.js'
import validateObjectId from '../../../validators/objectId.js'
import { createInternalServerError, createNotFoundError } from '../../../utils/createError.js'


class RoleController {

    async createRole(req , res , next) {
        try {
            
            const roleData = req.body
            roleData.permissions = stringToArray(roleData.permissions)

            await createRoleValidationSchema.validateAsync(roleData)

            const role = await roleModel.create(roleData)
            createInternalServerError(role)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'role created successfully',
                data : {
                    role
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
    async deleteRoleById(req , res , next) {
        try {
            const {roleId} = req.params
            await validateObjectId.validateAsync(roleId)

            const role = await roleModel.deleteOne({_id : roleId})

            createNotFoundError({role})
            if(+role.deletedCount === 0) throw createHttpError.InternalServerError('delete role faild')

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'role deleted successfully',
                data : {}
            })

            
        } catch (error) {
            next(error)
        }
    }
    async getRoleById(req , res , next) {
        try {
            const {roleId} = req.params
            await validateObjectId.validateAsync(roleId)

            const role = await roleModel.findById(roleId)
            createNotFoundError({role})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    role
                }
            })

        } catch (error) {
            
        }
    }
    async editRoleById(req , res , next) {
        try {
            const {roleId} = req.params
            const updateData = req.body
            updateData.permissions = stringToArray(updateData.permissions)

            await validateObjectId.validateAsync(roleId)
            await updateRoleValidationSchema.validateAsync(updateData)

            const role = await roleModel.findByIdAndUpdate(roleId , updateData)
            createNotFoundError({role})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'role updated successfully',
                data : {
                    role : {
                        role
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }

}

export default new RoleController()