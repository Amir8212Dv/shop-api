import express from 'express'
import productController from '../../controllers/admin/product.controller.js'
import multer from '../../middlewares/multer.js'

const router = express.Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          addProduct:
 *              type : object
 *              required : 
 *                  -    title
 *                  -    short_text
 *                  -    text
 *                  -    price
 *                  -    count
 *                  -    features
 *                  -    tags
 *                  -    category
 *              properties:
 *                  title:
 *                      type : string
 *                      description : title for product
 *                  short_text:
 *                      type : string
 *                      description : short description for product
 *                  text:
 *                      type : string
 *                      description : description for product
 *                  price:
 *                      type : number
 *                      description : product's price
 *                  discount:
 *                      type : number
 *                      description : product's descount
 *                  count:
 *                      type : number
 *                      description : total count of product
 *                  features:
 *                      type : object
 *                      description : length/width/height/weigth/model/madein  of product
 *                      properties:
 *                          length:
 *                              type : number
 *                              description : CM
 *                          width:
 *                              type : number
 *                              description : CM
 *                          height:
 *                              type : number
 *                              description : CM
 *                          weight:
 *                              type : number
 *                              description : g
 *                          model:
 *                              type : string
 *                          madein:
 *                              type : string
 *                  tags:
 *                      type : array
 *                      description : tags for product
 *                      items:
 *                          type : string
 *                  category:
 *                      type : string
 *                      description : category of product
 *          updateProduct:
 *              type : object
 *              properties:
 *                  title:
 *                      type : string
 *                      description : title for product
 *                  short_text:
 *                      type : string
 *                      description : short description for product
 *                  text:
 *                      type : string
 *                      description : description for product
 *                  price:
 *                      type : number
 *                      description : product's price
 *                  discount:
 *                      type : number
 *                      description : product's descount
 *                  count:
 *                      type : number
 *                      description : total count of product
 *                  features:
 *                      type : object
 *                      description : length/width/height/weigth/model/madein  of product
 *                      properties:
 *                          length:
 *                              type : number
 *                              description : CM
 *                          width:
 *                              type : number
 *                              description : CM
 *                          height:
 *                              type : number
 *                              description : CM
 *                          weight:
 *                              type : number
 *                              description : g
 *                          model:
 *                              type : string
 *                          madein:
 *                              type : string
 *                  tags:
 *                      type : array
 *                      description : tags for product
 *                      items:
 *                          type : string
 *                  category:
 *                      type : string
 *                      description : category of product
 *          addProductImage:
 *              type : object
 *              required :
 *                  -   images
 *              properties:
 *                  images:
 *                      type : array
 *                      items:
 *                          type : string
 *                          format : binary
 */

router.post('/add' , productController.addProduct)

/**
 * @swagger
 * /admin/product/add:
 *      post:
 *          tags : [product]
 *          summary : create product
 *          description : create product
 *          requestBody:
 *              required : true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/addProduct'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/addProduct'
 *          security:
 *              -   bearerAuth : []
 *          responses:
 *              201:
 *                  description : successfull
 */

router.post('/addImage/:id' , multer.array('images' , 10) , productController.addImage)

/**
 * @swagger
 * /admin/product/addImage:
 *      post:
 *          tags : [product]
 *          summary : add image for product
 *          description : add image for product
 *          security : 
 *              -   bearerAuth : []
 *          requestBody:
 *              required : true
 *              content : 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/addProductImage'
 *          responses:
 *              201:
 *                  description : successfully
 */

router.patch('/update/:id' , multer.array('images' , 10) , productController.editProduct)

/**
 * @swagger
 * /admin/product/update/{id}:
 *      patch:
 *          tags : [product]
 *          summary : create product
 *          description : create product
 *          requestBody:
 *              required : true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref : '#/components/schemas/updateProduct'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/updateProduct'
 *          security:
 *              -   bearerAuth : []
 *          responses:
 *              201:
 *                  description : successfull
 */

router.delete('/:id' , productController.removeProduct)

/**
 * @swagger
 * /admin/product/{id}:
 *      delete :
 *          tags : [product]
 *          summary : delete product
 *          description : delete product by id
 *          security :
 *              -   bearerAuth : []
 *          parameters : 
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses : 
 *              200 :
 *                  description : successfull
 */

router.get('/all' , productController.getAllProducts)

/**
 * @swagger
 * /admin/product/all:
 *      get:
 *          tags : [product]
 *          summary : get all products
 *          description : get all products
 *          security :
 *              -   bearerAuth : []
 *          parameters :
 *              -   in : query
 *                  type : string
 *                  name : search
 *                  description : search in  title & text & short_text of products
 *          responses : 
 *              200 : 
 *                  description : successfull
 * 
 */

router.get('/:id' , productController.getProductById)

/**
 * @swagger
 * /admin/product/{id}:
 *      get:
 *          tags : [product]
 *          summary : get product by id
 *          description : get product by id
 *          parameters : 
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          security :
 *              -   bearerAuth : []
 *          responses : 
 *              200 : 
 *                  description : successfull
 *          
 */


export default router