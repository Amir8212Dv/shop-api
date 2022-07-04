import express from 'express'

import categoryRouter from './category.js'
import blogRouter from './blog.js'
import productRouter from './product.js'
import courseRouter from './course.js'
import chapterRouter from './chapter.js'

const router = express.Router()

router.use('/product' , productRouter)
router.use('/category' , categoryRouter)
router.use('/blog' , blogRouter)
router.use('/course' , courseRouter)
router.use('/chapter' , chapterRouter)



export default router