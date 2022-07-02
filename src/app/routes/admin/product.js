import express from 'express'
import productController from '../../controllers/admin/product.controller.js'

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

router.patch('/update/:id' , productController.editProduct)

router.delete('/:id' , productController.removeProduct)

router.get('/all' , productController.getAllProducts)

router.get('/:id' , productController.getProductById)

export default router