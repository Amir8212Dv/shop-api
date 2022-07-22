import express from 'express'
import PermissionController from '../../controllers/admin/RBAC/permission.controller.js'

const permissionRouter = express.Router()

permissionRouter.post('/add' , PermissionController.createPermission)
permissionRouter.get('/all' , PermissionController.getAllPermission)
permissionRouter.patch('/update/:permissionId' , PermissionController.updatePermission)
permissionRouter.delete('/delete/:permissionId' , PermissionController.deletePermission)

export default permissionRouter