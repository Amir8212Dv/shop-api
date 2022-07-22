import express from 'express'
import ChapterController from '../../controllers/admin/course/chapter.controller.js'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'

const chapterRouter = express.Router()

chapterRouter.put('/add' , checkRole(permissions.TEACHER) , ChapterController.addChapter)
// chapterRouter.get('/all/:courseId' , ChapterController.getAllChaptersOfCourse)
// chapterRouter.get('/:chapterId' , ChapterController.getChapterById)
chapterRouter.delete('/delete/:chapterId' , checkRole(permissions.TEACHER) , ChapterController.deleteChapter)
chapterRouter.patch('/edit/:chapterId' , checkRole(permissions.TEACHER) , ChapterController.editChapter)

export default chapterRouter