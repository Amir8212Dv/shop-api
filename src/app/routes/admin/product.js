import express from 'express'
import ProductController from '../../controllers/admin/product/product.controller.js'
import { checkForCategoryId, checkForProductId } from '../../middlewares/checkForObjectId.js'
import checkRole from '../../middlewares/checkRole.js'
import { imageUpload } from '../../middlewares/multer.js'
import { permissions } from '../../utils/constants.js'

const productRouter = express.Router()


productRouter.post(
    '/create' , 
    checkRole(permissions.SUPLIER) ,
    imageUpload.array('images' , 10) , 
    checkForCategoryId,
    ProductController.createProduct
)
productRouter.patch(
    '/edit/:productId' , 
    checkRole(permissions.SUPLIER) ,
    checkForProductId,
    imageUpload.array('images' , 10) , 
    checkForCategoryId,
    ProductController.editProduct
)
productRouter.delete('/delete/:productId' , checkRole(permissions.SUPLIER) , ProductController.deleteProduct)

export default productRouter