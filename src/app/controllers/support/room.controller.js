import roomModel from '../../models/room.js'
import httpStatus from 'http-status-codes'
import createHttpError from "http-errors"
import validateObjectId from "../../validators/objectId.js"
import { createInternalServerError, createNotFoundError } from '../../utils/createError.js'
import { roomValidationSchema } from "../../validators/support/room.js"
import namespaceModel from "../../models/namespace.js"


class RoomController {

    async createRoom(req , res , next) {
        try {

            const {namespaceId} = req.params
            await validateObjectId.validateAsync(namespaceId)
            const imagePath = req.file && (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            if(imagePath) req.body.image = imagePath


            const roomData = req.body
            await roomValidationSchema.validateAsync(roomData)
            roomData.for = namespaceId

            const room = await roomModel.create(roomData)
            createInternalServerError(room)

            const updateNamespace = await namespaceModel.updateOne({_id : namespaceId} , {$push : {rooms : room._id}})
            createInternalServerError(updateNamespace.modifiedCount)

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

            const {namespaceId} = req.params
            await validateObjectId.validateAsync(namespaceId)
            const rooms = await roomModel.find({for : namespaceId} , {messages : 0})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : '',
                data : {
                    rooms
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async deleteRoom(req , res , next) {
        try {

            const {roomId} = req.params
            await validateObjectId.validateAsync(roomId)


            const room = await roomModel.deleteOne({_id : roomId})
            createNotFoundError({room})
            const deleteRoom = await roomModel.deleteOne({_id : roomId})
            createInternalServerError(deleteRoom.deletedCount)

            namespaceModel.updateOne({_id : room.for} , {$pull : {rooms : roomId}})

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'room and messages in room delete successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
    async editRoom(req , res , next) {
        try {

            const {roomId} = req.params
            await validateObjectId.validateAsync(roomId)
            const updateData = req.body
            await roomValidationSchema.validateAsync(updateData)
            const file = req.file

            
            if(file) updateData.image = (file.path.split('public')[1]).replaceAll('\\' , '/')
            
            const room = await roomModel.updateOne({_id : roomId} , updateData)
            createNotFoundError({room})
            createInternalServerError(room.modifiedCount)

            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'room edited successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
}


export default new RoomController()