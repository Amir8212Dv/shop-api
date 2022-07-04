import express from 'express'
import productController from '../../controllers/admin/product.controller.js'
import multer from '../../middlewares/multer.js'

const router = express.Router()


router.post('/add' , productController.addProduct)


router.post('/addImage/:id' , multer.array('images' , 10) , productController.addImage)


router.patch('/update/:id' , multer.array('images' , 10) , productController.editProduct)


router.delete('/remove/:id' , productController.removeProduct)


router.get('/all' , productController.getAllProducts)


router.get('/:id' , productController.getProductById)

export default router