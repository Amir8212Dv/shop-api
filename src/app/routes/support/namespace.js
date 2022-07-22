import express from 'express'
import NamespaceController from '../../controllers/support/namespace.controller.js'

const namespaceRouter = express.Router()

namespaceRouter.post('/create' , NamespaceController.createNamespace)

namespaceRouter.get('/all' , NamespaceController.getNamespaces)

namespaceRouter.delete('delete/:namespaceId' , NamespaceController.deleteNamespace)

namespaceRouter.patch('/edit/:namespaceId' , NamespaceController.editNamespace)

export default namespaceRouter