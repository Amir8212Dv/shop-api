import express from 'express'
import authRouter from './user/auth.js'
import admingRouter from './admin/admin.routes.js'
import verifyAccessToken from '../middlewares/verifyAccessToken.js'
import checkRole from '../middlewares/checkRole.js'

const router = express.Router()

router.use('/user' , authRouter)
router.use('/admin' , verifyAccessToken , checkRole('ADMIN') , admingRouter)
// router.get('/' , (req,  res) => {
//     console.log(req.header)
// } )

export default router