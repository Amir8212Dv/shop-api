import express from 'express'
import authRouter from './user/auth.js'
import admingRouter from './admin/admin.routes.js'
import verifyAccessToken from '../middlewares/verifyAccessToken.js'
import checkRole from '../middlewares/checkRole.js'
import { permissions } from '../utils/constants.js'
import expressGraphql from 'express-graphql'
import graphqlConfig from '../graphql/graphql.config.js'
import paymentRouter from './api/payment.js'
import supportRouter from './support/support.routes.js'
 
const router = express.Router()

router.use('/user' , authRouter)

router.use('/admin' , verifyAccessToken , checkRole([permissions.ADMIN]) , admingRouter)

router.use('/graphql' , expressGraphql.graphqlHTTP(graphqlConfig))

router.use('/payment'  , verifyAccessToken , paymentRouter)

router.use('/support' , supportRouter)


export default router