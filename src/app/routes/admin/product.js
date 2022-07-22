import express from 'express'
import ProductController from '../../controllers/admin/product/product.controller.js'
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
    ProductController.createProduct
)
productRouter.patch(
    '/update/:productId' , 
    checkRole(permissions.SUPLIER) ,
    checkForProductId,
    checkForCategoryId,
    imageUpload.array('images' , 10) , 
    ProductController.editProduct
)
productRouter.delete('/remove/:productId' , checkRole(permissions.SUPLIER) , ProductController.deleteProduct)
// productRouter.get('/all' , ProductController.getAllProducts)
// productRouter.get('/:productId' , ProductController.getProductById)

export default productRouter