import express from 'express'
import auth from '../../controllers/user/auth.controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *      name : auth
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          getOtp:
 *              type : object
 *              required :
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type : string
 *                      description : phone number for send the otp
 *          login:
 *              type : object
 *              required:
 *                  -   mobile
 *                  -   otp
 *              properties:
 *                  mobile:
 *                      type : string
 *                      description : phone number for login
 *                  otp :
 *                      type : string
 *                      description : one time password that sneded to phone number
 *          refreshToken:
 *              type : object
 *              required :
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type : string
 *                      description : refresh token for get a new access token
 */


router.post('/getOtp' , auth.getOtp)

/**
 * @swagger
 * /user/getOtp:
 *      post:
 *          tags : [auth]
 *          summary : get otp
 *          descriptoin : get one time password
 *          requestBody:
 *              required : true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/getOtp'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/getOtp'
 *          responses:
 *              200:
 *                  description : successfully
 *          
 */

router.post('/login' , auth.login)

/**
 * @swagger
 * /user/login:
 *      post:
 *          tags : [auth]
 *          summary : login
 *          description : login with otp
 *          requestBody:
 *              required : true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/login'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/login'
 *          responses : 
 *              200:
 *                  description : successfull
 */

router.post('/refresh-token' , auth.refreshToken)

/**
 * @swagger
 * /user/refresh-token:
 *      post:
 *          tags : [auth]
 *          summary : get refresh token
 *          description : get new refresh token and access token
 *          requestBody:
 *              required : true
 *              content :
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/refreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/refreshToken'
 *          responses : 
 *              200:
 *                  description : successfull
 */

export default router