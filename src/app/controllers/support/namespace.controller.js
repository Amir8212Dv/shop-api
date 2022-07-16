import converstationModel from "../../models/converstation.js"
import httpStatus from 'http-status-codes'
import createHttpError from "http-errors"


class namespaceController {

    async createNamespace(req , res , next) {
        try {
            
            const {title , endpoint} = req.body

            const namespace = await converstationModel.create({title , endpoint})
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
}


export default new namespaceController()