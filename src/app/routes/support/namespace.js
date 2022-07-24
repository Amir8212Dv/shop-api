import express from 'express'
import NamespaceController from '../../controllers/support/namespace.controller.js'

const namespaceRouter = express.Router()

namespaceRouter.post('/create' , NamespaceController.createNamespace)
namespaceRouter.get('/all' , NamespaceController.getAllNamespaces)
namespaceRouter.patch('/edit/:namespaceId' , NamespaceController.editNamespace)
namespaceRouter.delete('/delete/:namespaceId' , NamespaceController.deleteNamespace)

export default namespaceRouter