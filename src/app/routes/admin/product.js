import express from 'express'
import productController from '../../controllers/admin/product/product.controller.js'
import multer from '../../middlewares/multer.js'

const productRouter = express.Router()


productRouter.post('/add' , productController.addProduct)


productRouter.post('/addImage/:id' , multer.array('images' , 10) , productController.addImage)


productRouter.patch('/update/:id' , multer.array('images' , 10) , productController.editProduct)


productRouter.delete('/remove/:id' , productController.removeProduct)


productRouter.get('/all' , productController.getAllProducts)


productRouter.get('/:id' , productController.getProductById)

export default productRouter