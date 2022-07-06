import express from 'express'
import permissionController from '../../controllers/admin/RBAC/permission.controller.js'

const permissionRouter = express.Router()

permissionRouter.post('/add' , permissionController.createPermission)
permissionRouter.get('/all' , permissionController.getAllPermission)
permissionRouter.patch('/update/:permissionId' , permissionController.updatePermission)
permissionRouter.delete('/delete/:permissionId' , permissionController.deletePermission)

export default permissionRouter