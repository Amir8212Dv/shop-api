import express from 'express'
import RoleController from '../../controllers/admin/RBAC/role.controller.js'
import { checkForPermissions } from '../../middlewares/checkForObjectId.js'


const roleRouter = express.Router()

roleRouter.post('/create' , checkForPermissions , RoleController.createRole)
roleRouter.get('/all' , RoleController.getAllRoles)
roleRouter.get('/:roleId' , RoleController.getRoleById)
roleRouter.patch('/edit/:roleId' , checkForPermissions , RoleController.editRoleById)
roleRouter.delete('/delete/:roleId' , RoleController.deleteRoleById)


export default roleRouter