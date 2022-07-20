import express from 'express'
import categoryController from '../../controllers/admin/category/category.controller.js'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'

const categoryRouter = express.Router()

categoryRouter.post('/create' , checkRole(permissions.ADMIN) , categoryController.addCategory)


// categoryRouter.get('/all' , categoryController.getAllCategory)

// categoryRouter.get('/headCategories' , categoryController.getHeadCategories)


// categoryRouter.get('/subCategories/:parentId' , categoryController.getSubCategories)


// categoryRouter.get('/:categoryId' , categoryController.getCategoryById)


categoryRouter.patch('/edit/:categoryId' , checkRole(permissions.ADMIN) , categoryController.editCategory)


categoryRouter.delete('/remove/:categoryId' , checkRole(permissions.ADMIN) , categoryController.removCategory)



export default categoryRouter
