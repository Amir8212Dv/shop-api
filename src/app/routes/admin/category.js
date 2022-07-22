import express from 'express'
import CategoryController from '../../controllers/admin/category/category.controller.js'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'

const categoryRouter = express.Router()

categoryRouter.post('/create' , checkRole(permissions.ADMIN) , CategoryController.addCategory)


// categoryRouter.get('/all' , CategoryController.getAllCategory)

// categoryRouter.get('/headCategories' , CategoryController.getHeadCategories)


// categoryRouter.get('/subCategories/:parentId' , CategoryController.getSubCategories)


// categoryRouter.get('/:categoryId' , CategoryController.getCategoryById)


categoryRouter.patch('/edit/:categoryId' , checkRole(permissions.ADMIN) , CategoryController.editCategory)


categoryRouter.delete('/remove/:categoryId' , checkRole(permissions.ADMIN) , CategoryController.removCategory)



export default categoryRouter
