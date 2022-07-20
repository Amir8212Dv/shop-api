import express from 'express'
import productController from '../../controllers/admin/product/product.controller.js'
import { checkForCategoryId, checkForProductId } from '../../middlewares/checkForObjectId.js'
import checkRole from '../../middlewares/checkRole.js'
import { imageUpload } from '../../middlewares/multer.js'
import { permissions } from '../../utils/constants.js'

const productRouter = express.Router()


productRouter.post(
    '/add' , 
    checkRole(permissions.SUPLIER) ,
    checkForCategoryId,
    imageUpload.array('images' , 10) , 
    productController.addProduct
)
productRouter.patch(
    '/update/:productId' , 
    checkRole(permissions.SUPLIER) ,
    checkForProductId,
    checkForCategoryId,
    imageUpload.array('images' , 10) , 
    productController.editProduct
)
productRouter.delete('/remove/:productId' , checkRole(permissions.SUPLIER) , productController.removeProduct)
productRouter.get('/all' , productController.getAllProducts)
productRouter.get('/:productId' , productController.getProductById)

export default productRouter