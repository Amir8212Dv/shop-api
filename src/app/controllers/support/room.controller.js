import converstationModel from "../../models/converstation.js"
import httpStatus from 'http-status-codes'
import createHttpError from "http-errors"
import validateObjectId from "../../validators/objectId.js"
import { createNotFoundError } from '../../utils/createError.js'
import { roomValidationSchema } from "../../validators/support/room.js"


class RoomController {

    async createRoom(req , res , next) {
        try {
            
            const imagePath = req.file && (req.file.path.split('public')[1]).replaceAll('\\' , '/')
            if(imagePath) req.body.image = imagePath

            const roomData = req.body
            await roomValidationSchema.validateAsync(roomData)

            const namespace = await converstationModel.updateOne({_id : req.params.spaceId} , {$push : {rooms : roomData}})
            if(!+namespace.modifiedCount) throw createHttpError.InternalServerError('create namespace faild')
            createNotFoundError({namespace})

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

            const namespaces = await converstationModel.findOne({_id : req.params.spaceId} , {'rooms.messages' : 0})
            console.log(namespaces.rooms)

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
    async deleteRoom(req , res , next) {
        try {

            const {roomId} = req.params
            await validateObjectId.validateAsync(roomId)

            const room = await converstationModel.updateOne({'rooms._id' : roomId} , {$pull : {rooms : {_id : roomId}}})
            createNotFoundError({room})
            if(!+room.modifiedCount) throw createHttpError.InternalServerError('delete room faild')


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


            const room = await converstationModel.updateOne({'rooms._id' : roomId} , updateData)
            createNotFoundError({room})
            if(!+room.modifiedCount) throw createHttpError.InternalServerError('delete room faild')


            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'room and messages in room delete successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
}


export default new RoomController()