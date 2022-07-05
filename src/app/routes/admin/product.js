import express from 'express'
import productController from '../../controllers/admin/product/product.controller.js'
import { imageUpload } from '../../middlewares/multer.js'

const productRouter = express.Router()


productRouter.post('/add' , imageUpload.array('images' , 10) , productController.addProduct)


// productRouter.post('/addImage/:id' , multer.array('images' , 10) , productController.addImage)


productRouter.patch('/update/:id' , imageUpload.array('images' , 10) , productController.editProduct)


productRouter.delete('/remove/:id' , productController.removeProduct)


productRouter.get('/all' , productController.getAllProducts)


productRouter.get('/:id' , productController.getProductById)

export default productRouter