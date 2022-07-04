import express from 'express'
import categoryController from '../../controllers/admin/category.controller.js'

const router = express.Router()

router.post('/create' , categoryController.addCategory)


router.get('/all' , categoryController.getAllCategory)

router.get('/headCategories' , categoryController.getHeadCategories)


router.get('/subCategories/:parentId' , categoryController.getSubCategories)


router.get('/:id' , categoryController.getCategoryById)


router.patch('/edit/:id' , categoryController.editCategory)


router.delete('/remove/:id' , categoryController.removCategory)



export default router
