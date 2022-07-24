import express from 'express'
import CommentController from '../../controllers/admin/comment/comment.controller.js'

const commentRouter = express.Router()

commentRouter.patch('/edit-show-comment/:commentId' , CommentController.editToShowComment)
commentRouter.delete('/delete/:commentId' , CommentController.deleteComment)

export default commentRouter