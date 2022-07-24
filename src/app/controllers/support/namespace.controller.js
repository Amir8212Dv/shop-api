import namespaceModel from "../../models/namespace.js"
import httpStatus from 'http-status-codes'
import validateObjectId from "../../validators/objectId.js"
import { createInternalServerError, createNotFoundError } from '../../utils/createError.js'
import { namespaceValidationSchema } from "../../validators/support/namespace.js"

class NamespaceController {

    async createNamespace(req , res , next) {
        try {
            
            const namespaceData = req.body
            await namespaceValidationSchema.validateAsync(namespaceData)

            const namespace = await namespaceModel.create(namespaceData)
            createInternalServerError(namespace)

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'namespace created successfully',
                data : {
                    namespace
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async getAllNamespaces(req , res , next) {
        try {

            const namespaces = await namespaceModel.find({} , {rooms : 0})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    namespaces
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async deleteNamespace(req , res , next) {
        try {
            const {namespaceId} = req.params
            await validateObjectId.validateAsync(namespaceId)

            const namespace = await namespaceModel.deleteOne({_id : namespaceId})
            createNotFoundError({namespace})
            createInternalServerError(namespace.deletedCount)

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'namespace and rooms and messages in namespace deleted successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
    async editNamespace(req , res , next) {
        try {
            const {namespaceId} = req.params
            await validateObjectId.validateAsync(namespaceId)
            const updateData = req.body
            await namespaceValidationSchema.validateAsync(updateData)

            const namespace = await namespaceModel.updateOne({_id : namespaceId} , updateData)
            createNotFoundError({namespace})
            createInternalServerError(namespace.modifiedCount)

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'namespace updated successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
}
 

export default new NamespaceController()