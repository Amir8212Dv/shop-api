import express from 'express'
import chapterController from '../../controllers/admin/course/chapter.controller.js'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'

const chapterRouter = express.Router()

chapterRouter.put('/add' , checkRole(permissions.TEACHER) , chapterController.addChapter)
chapterRouter.get('/all/:courseId' , chapterController.getAllChaptersOfCourse)
chapterRouter.get('/:chapterId' , chapterController.getChapterById)
chapterRouter.delete('/delete/:chapterId' , checkRole(permissions.TEACHER) , chapterController.deleteChapter)
chapterRouter.patch('/edit/:chapterId' , checkRole(permissions.TEACHER) , chapterController.editChapter)

export default chapterRouter