import express from 'express'
import categoryRouter from './category.js'

const router = express.Router()

router.use('/category' , categoryRouter)

export default router