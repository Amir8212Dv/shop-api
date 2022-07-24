import commentModel from "../../../models/comments.js"
import validateObjectId from "../../../validators/objectId.js"
import {createInternalServerError, createNotFoundError} from '../../../utils/createError.js'
import httpStatus from 'http-status-codes'

class CommentController {
    async editToShowComment(req , res , next) {
        try {
            const {commentId} = req.params
            await validateObjectId.validateAsync(commentId)
    
            const comment = await commentModel.updateOne({_id : commentId} , {show : true})
            createNotFoundError({comment})
            createInternalServerError(comment.modifiedCount)
    
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'comment updated successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
    async deleteComment(req , res , next) {
        try {
            const {commentId} = req.params
            await validateObjectId.validateAsync(commentId)
    
            const comment = await commentModel.deleteOne({_id : commentId})
            createNotFoundError({comment})
            createInternalServerError(comment.deletedCount)
    
            res.status(httpStatus.OK).send({
                status : httpStatus.OK,
                message : 'comment deleted successfully',
                data : {}
            })
            
        } catch (error) {
            next(error)
        }
    }
}

export default new CommentController()