import express from 'express'
import PermissionController from '../../controllers/admin/RBAC/permission.controller.js'

const permissionRouter = express.Router()

permissionRouter.post('/create' , PermissionController.createPermission)
permissionRouter.get('/all' , PermissionController.getAllPermission)
permissionRouter.get('/:permissinoId' , PermissionController.getPermissionById)
permissionRouter.patch('/edit/:permissionId' , PermissionController.editPermission)
permissionRouter.delete('/delete/:permissionId' , PermissionController.deletePermission)

export default permissionRouter