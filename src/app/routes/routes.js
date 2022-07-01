import express from 'express'
import authRouter from './user/auth.js'
import admingRouter from './admin/admin.routes.js'
import verifyAccessToken from '../middlewares/verifyAccessToken.js'
import checkRole from '../middlewares/checkRole.js'

const router = express.Router()

router.use('/user' , authRouter)
router.use('/admin' , verifyAccessToken , checkRole('ADMIN') , admingRouter)


/**
 * @swagger
 * tags :
 *  name : a
 *  description : 11
 */

/**
* @swagger
* /amir:
*  get:
*      summary : index of routes
*      tags : a
*      description : root
*      responses : 
*          200 : 
*              description : true request and response
*          404 : 
*              description : not found
 */

/**
* @swagger
* /data:
*  post:
*       summary : post data
*       tags : a
*       description : post many data
*       responses :
*           200:
*               description : true request
*       consumes : 
*           - application/json
*       parameters:
*         - in: body
*           name : user
*           description : nont
*           schema :
*              type : object
*              required : 
*                  - username
*                  - mobile
*                  - email
*              properties : 
*                  username:
*                      type : string
*                  mobile:
*                      type : string
*                  email:
*                      type : string
 */



export default router