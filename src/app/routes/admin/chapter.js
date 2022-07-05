import express from 'express'
import chapterController from '../../controllers/admin/course/chapter.controller.js'

const chapterRouter = express.Router()

chapterRouter.put('/add' , chapterController.addChapter)
chapterRouter.get('/all/:courseId' , chapterController.getAllChaptersOfCourse)
chapterRouter.get('/:chapterId' , chapterController.getChapterById)
chapterRouter.delete('/delete/:chapterId' , chapterController.deleteChapter)
chapterRouter.patch('/edit/:chapterId' , chapterController.editChapter)

export default chapterRouter