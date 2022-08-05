import express from 'express'
import ChapterController from '../../controllers/admin/course/chapter.controller.js'
import { checkAccessForChapters } from '../../middlewares/checkAccessForCRUD.js'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'

const chapterRouter = express.Router()

chapterRouter.put(
    '/create' , 
    checkRole(permissions.TEACHER) , 
    checkAccessForChapters , 
    ChapterController.createChapter
)
chapterRouter.delete(
    '/delete/:chapterId' , 
    checkRole(permissions.TEACHER) , 
    checkAccessForChapters , 
    ChapterController.deleteChapter
)
chapterRouter.patch(
    '/edit/:chapterId' , 
    checkRole(permissions.TEACHER) , 
    checkAccessForChapters , 
    ChapterController.editChapter
)

export default chapterRouter