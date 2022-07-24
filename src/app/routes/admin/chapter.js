import express from 'express'
import ChapterController from '../../controllers/admin/course/chapter.controller.js'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'

const chapterRouter = express.Router()

chapterRouter.put('/create' , checkRole(permissions.TEACHER) , ChapterController.createChapter)
chapterRouter.delete('/delete/:chapterId' , checkRole(permissions.TEACHER) , ChapterController.deleteChapter)
chapterRouter.patch('/edit/:chapterId' , checkRole(permissions.TEACHER) , ChapterController.editChapter)

export default chapterRouter