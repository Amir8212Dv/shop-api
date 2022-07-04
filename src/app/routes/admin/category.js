import express from 'express'
import categoryController from '../../controllers/admin/category/category.controller.js'

const categoryRouter = express.Router()

categoryRouter.post('/create' , categoryController.addCategory)


categoryRouter.get('/all' , categoryController.getAllCategory)

categoryRouter.get('/headCategories' , categoryController.getHeadCategories)


categoryRouter.get('/subCategories/:parentId' , categoryController.getSubCategories)


categoryRouter.get('/:id' , categoryController.getCategoryById)


categoryRouter.patch('/edit/:id' , categoryController.editCategory)


categoryRouter.delete('/remove/:id' , categoryController.removCategory)



export default categoryRouter
