import express from 'express'
import RoleController from '../../controllers/admin/RBAC/role.controller.js'


const roleRouter = express.Router()

roleRouter.post('/add' , RoleController.createRole)
roleRouter.get('/all' , RoleController.getAllRoles)
roleRouter.patch('/update/:roleId' , RoleController.updateRoleById)
roleRouter.delete('/delete/:roleId' , RoleController.deleteRoleById)


export default roleRouter