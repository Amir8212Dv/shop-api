import express from 'express'
import categoryRouter from './category.js'
import blogRouter from './blog.js'
import productRouter from './product.js'

const router = express.Router()

router.use('/product' , productRouter)
router.use('/category' , categoryRouter)
router.use('/blog' , blogRouter)


export default router