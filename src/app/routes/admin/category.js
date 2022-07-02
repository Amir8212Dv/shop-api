import express from 'express'
import categoryController from '../../controllers/admin/category.controller.js'

const router = express.Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          createCategory:
 *              type : object
 *              required :
 *                  -   title
 *              properties:
 *                  title:
 *                      type : string
 *                      description : title for category
 *                  parent:
 *                      type : string
 *                      description : ObjectId of parent of category
 *          updateCategory:
 *              type : object
 *              required : 
 *                  -   title
 *              properties:
 *                  title:
 *                      type : string
 *                      description : new title for category
 *              
 *          
 *      securitySchemes:
 *          bearerAuth:
 *              type : http
 *              scheme : bearer
 *              bearerFormat: JWT
 * 
 * 
 */
router.post('/create' , categoryController.addCategory)

/**
 * @swagger
 * /admin/category/create:
 *      post:
 *          tags : [category]
 *          summary : create category
 *          description : create category
 *          requestBody:
 *              required : true
 *              content : 
 *                  application/x-www-form-urlencoded :
 *                      schema :
 *                          $ref : '#/components/schemas/createCategory'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/createCategory'
 *          security:
 *              -   bearerAuth : []
 *
 *          responses:
 *              201:
 *                  description : category created successfully 
 *          
 */

router.get('/all' , categoryController.getAllCategory)
/**
 * @swagger
 * /admin/category/all:
 *      get:
 *          tags : [category]
 *          summary : get all categories
 *          description : get all categories
 *          security :
 *              -   bearerAuth : []
 *          responses :
 *              200:
 *                  description : successfull
 */

router.get('/headCategories' , categoryController.getHeadCategories)

/**
 * @swagger
 * /admin/category/headCategories:
 *      get:
 *          tags : [category]
 *          summary : get all head categories
 *          description : get all head categories
 *          security :
 *              -   bearerAuth : []
 *          responses :
 *              200:
 *                  description : successfull
 */

router.get('/subCategories/:parentId' , categoryController.getSubCategories)

/**
 * @swagger
 * /admin/category/subCategories/{parentId}:
 *      get:
 *          tags : [category]
 *          summary : get sub categories
 *          description : get sub categories of a head category
 *          parameters:
 *              -   in : path
 *                  name : parentId
 *                  type : string
 *                  required : true
 *          security : 
 *              -   bearerAuth : []
 *          responses : 
 *              200 : 
 *                  description : successfully
 */

router.get('/:id' , categoryController.getCategoryById)

/**
 * @swagger
 * /admin/category/{id}:
 *      get:
 *          tags : [category]
 *          summary : get category by id
 *          description : get category by id
 *          parameters:
 *              -   in : path
 *                  type : string
 *                  name : id
 *                  required : true
 *          security:
 *              -   bearerAuth : []
 *          responses :
 *              200 : 
 *                  description : successfull
 * 
 */

router.patch('/:id' , categoryController.editCategory)

/**
 * @swagger
 * /admin/category/{id}:
 *      patch:
 *          tags : [category]
 *          summary : update category
 *          description : update category with id
 *          requestBody:
 *              required : true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/updateCategory'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/updateCategory'
 *          parameters:
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          security:
 *              -   bearerAuth : []
 *          responses : 
 *              201 :
 *                  description : successfully
 *              
 */

router.delete('/:id' , categoryController.removCategory)

/**
 * @swagger
 * /admin/category/{id}:
 *      delete:
 *          tags : [category]
 *          summary : delete category
 *          description : delete category with all subcategories
 *          parameters:
 *              -   in : path
 *                  type : string
 *                  name : id
 *                  required : true
 *          security :
 *              -   bearerAuth : []
 *          responses : 
 *              200:
 *                  description : successfully
 */


export default router
