import converstationModel from "../../models/converstation.js"
import httpStatus from 'http-status-codes'
import createHttpError from "http-errors"


class namespaceController {

    async createRoom(req , res , next) {
        try {
            
            const imagePath = req.file && (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            if(imagePath) req.body.image = imagePath

            const updatedNamespace = await converstationModel.updateOne({_id : req.params.spaceId} , {$push : {rooms : req.body}})
            if(!+updatedNamespace.modifiedCount) throw createHttpError.InternalServerError('create namespace faild')
            if(!+updatedNamespace.matchedCount) throw createHttpError.NotFound('namespace not found')

            res.status(httpStatus.CREATED).send({
                status : httpStatus.CREATED,
                message : 'room created successfully',
                data : {}
            })

        } catch (error) {
            next(error)
        }
    }
    async getAllRooms(req , res , next) {
        try {

            const namespaces = await converstationModel.find({_id : req.params.spaceId} , {rooms : 1})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    rooms : namespaces.rooms
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
}


export default new namespaceController()