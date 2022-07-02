import express from 'express'
import blogsController from '../../controllers/admin/blogs.controller.js'
import multer from '../../middlewares/multer.js'

const router = express.Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          createBlog:
 *              type : object
 *              required :
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   category
 *              properties:
 *                  title:
 *                      type : string
 *                      description : title of category
 *                  text:
 *                      type : string
 *                      description : description for category
 *                  short_text:
 *                      type : string
 *                      description : a short description for category
 *                  category:
 *                      type : string
 *                      description : category Id
 *          updateBlog:
 *              type : object
 *              properties:
 *                  title:
 *                      type : string
 *                      description : title of category
 *                  text:
 *                      type : string
 *                      description : description for category
 *                  short_text:
 *                      type : string
 *                      description : a short description for category
 *                  category:
 *                      type : string
 *                      description : category Id
 *          addImage:
 *              type : object
 *              required:
 *                  -   image
 *              properties:
 *                  image:
 *                      type : file
 *                      description : image for blog
 *              
 *          
 * 
 */


router.post('/create' , blogsController.createBlog)
/**
 * @swagger
 * /admin/blog/create:
 *      post:
 *          tags : [blog]
 *          summary : create blog
 *          description : create blog
 *          security :
 *              -   bearerAuth : []
 *          requestBody:
 *              required : true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/createBlog'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/createBlog'
 *          responses :
 *              201:
 *                  description : successfull
 *              
 */

router.post('/image/:id' , multer.single('image') , blogsController.addImage)

/**
 * @swagger
 * /admin/blog/image/{id}:
 *      post:
 *          tags : [blog]
 *          summary : add image to blog
 *          description : add image to blog
 *          security:
 *              -   bearerAuth : []
 *          requestBody:
 *              required : true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/addImage'
 *          parameters:
 *              -   in: path
 *                  type : string
 *                  name : id
 *                  required : true
 *          responses :
 *              201:
 *                  description : successfull
 *                  
 */

router.get('/all' , blogsController.getAllBlogs)

/**
 * @swagger
 * /admin/blog/all:
 *      get:
 *          tags : [blog]
 *          summary : get all blogs
 *          description : get all blogs
 *          security:
 *              -   bearerAuth : []
 *          responses:
 *              200 : 
 *                  successfully
 */

router.get('/comments/:id' , blogsController.getCommentsOfBlog)

/**
 * @swagger
 * /admin/blog/comments/{id}:
 *      get:
 *          tags : [blog]
 *          summary : get comments of blog
 *          description : get comments of blog with id
 *          security:
 *              -   bearerAuth : []
 *          parameters:
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses : 
 *              200:
 *                  description : successfully
 */

router.get('/:id' , blogsController.getBlogById)

/**
 * @swagger
 * /admin/blog/{id}:
 *      get:
 *          tags : [blog]
 *          summary : get blog by id
 *          description : get blog by id
 *          security:
 *              -   bearerAuth : []
 *          parameters : 
 *              -   in : path
 *                  type : string
 *                  name : id
 *                  required : true
 *          responses : 
 *              200:
 *                  description : successfully
 */

router.delete('/remvoeBlog/:id' , blogsController.deleteBlogById)

/**
 * @swagger
 * /admin/blog/removeBlog/{id}:
 *      delete:
 *          tags : [blog]
 *          summary : delete blog
 *          description : delete blog with id
 *          security : 
 *              -   bearerAuth : []
 *          parameters : 
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses : 
 *              200 :
 *                  description : successfully
 */

router.patch('/update/:id' , blogsController.updateBlogById)

/**
 * @swagger
 * /admin/blog/update/{id}:
 *      patch:
 *          tags : [blog]
 *          summary : update blog
 *          description : update blog
 *          security:
 *              -   bearerAuth : []
 *          requestBody:
 *              required : true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/updateBlog'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/updateBlog'
 *          parameters:
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses : 
 *              200:
 *                  description : successfully
 */

export default router