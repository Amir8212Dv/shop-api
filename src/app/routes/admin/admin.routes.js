import express from 'express'
import categoryRouter from './category.js'
import blogRouter from './blog.js'
import productRouter from './product.js'

const router = express.Router()

router.use('/product' , productRouter)
router.use('/category' , categoryRouter)
router.use('/blog' , blogRouter)

/**
 * @swagger
 * tags:
 *      name : category
 *      description : category APIs
 */
/**
 * @swagger
 * tags:
 *      name : product
 *      description : product APIs
 */
/**
 * @swagger
 * tags:
 *      name : blog
 *      description : blog APIs
 */

export default router