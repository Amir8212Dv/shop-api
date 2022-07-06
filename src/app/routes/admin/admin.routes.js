import express from 'express'

import categoryRouter from './category.js'
import blogRouter from './blog.js'
import productRouter from './product.js'
import courseRouter from './course.js'
import chapterRouter from './chapter.js'
import episodeRouter from './episode.js'
import userRouter from './user.js'
import roleRouter from './role.js'
import permissionRouter from './permission.js'


const router = express.Router()

router.use('/product' , productRouter)
router.use('/category' , categoryRouter)
router.use('/blog' , blogRouter)
router.use('/course' , courseRouter)
router.use('/chapter' , chapterRouter)
router.use('/episode' , episodeRouter)
router.use('/user' , userRouter)
router.use('/role' , roleRouter)
router.use('/permission' , permissionRouter)



export default router