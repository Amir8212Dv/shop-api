import commentModel from "../../../models/comments.js"
import validateObjectId from "../../../validators/objectId.js"
import {createNotFoundError} from '../../../utils/createError.js'

class CommentController {
    async editToShowComment(req , res , next) {
        const {commentId} = req.params
        await validateObjectId.validateAsync(commentId)

        const comment = await commentModel.updateOne({_id : commentId} , {show : true})
        createNotFoundError({comment})

        res.status(httpStatus.OK).send({
            status : httpStatus.OK,
            message : 'comment updated successfully',
            data : {}
        })
    }
    async deleteComment(req , res , next) {
        const {commentId} = req.params
        await validateObjectId.validateAsync(commentId)

        const comment = await commentModel.deleteOne({_id : commentId})
        createNotFoundError({comment})

        res.status(httpStatus.OK).send({
            status : httpStatus.OK,
            message : 'comment deleted successfully',
            data : {}
        })
    }
}

export default new CommentController()