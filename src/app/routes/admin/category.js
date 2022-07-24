import express from 'express'
import CategoryController from '../../controllers/admin/category/category.controller.js'
import checkRole from '../../middlewares/checkRole.js'
import { permissions } from '../../utils/constants.js'

const categoryRouter = express.Router()

categoryRouter.post('/create' , checkRole(permissions.ADMIN) , CategoryController.createCategory)
categoryRouter.patch('/edit/:categoryId' , checkRole(permissions.ADMIN) , CategoryController.editCategory)
categoryRouter.delete('/delete/:categoryId' , checkRole(permissions.ADMIN) , CategoryController.deleteCategory)


export default categoryRouter
