import converstationModel from "../../models/converstation.js"
import httpStatus from 'http-status-codes'
import createHttpError from "http-errors"
import validateObjectId from "../../validators/objectId.js"
import { createNotFoundError } from '../../utils.createError.js'
import { namespaceValidationSchema } from "../../validators/support/namespace.js"

class namespaceController {

    async createNamespace(req , res , next) {
        try {
            
            const namespaceData = req.body
            await namespaceValidationSchema.validateAsync(namespaceData)

            const namespace = await converstationModel.create(namespaceData)
            if(!namespace) throw createHttpError.InternalServerError('create namespace faild')

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'namespace created successfully',
                data : {}
            })

        } catch (error) {
            next(error)
        }
    }
    async getNamespaces(req , res , next) {
        try {

            const namespaces = await converstationModel.find({} , {rooms : 0})

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

            const namespace = await converstationModel.deleteOne({_id : namespaceId})
            createNotFoundError({namespace})

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

            const namespace = await converstationModel.findByIdAndUpdate(namespaceId , updateData , {returnDocument : 'after'})
            createNotFoundError({namespace})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'namespace and rooms and messages in namespace deleted successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
}
 

export default new namespaceController()