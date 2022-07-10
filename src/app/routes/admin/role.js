import express from 'express'
import roleController from '../../controllers/admin/RBAC/role.controller.js'


const roleRouter = express.Router()

roleRouter.post('/add' , roleController.createRole)
roleRouter.get('/all' , roleController.getAllRoles)
roleRouter.patch('/update/:roleId' , roleController.updateRoleById)
roleRouter.delete('/delete/:roleId' , roleController.deleteRoleById)


export default roleRouter