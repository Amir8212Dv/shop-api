import express from 'express'
import NamespaceController from '../../controllers/support/namespace.controller.js'

const namespaceRouter = express.Router()

namespaceRouter.post('/create' , NamespaceController.createNamespace)

namespaceRouter.get('/all' , NamespaceController.getNamespaces)

export default namespaceRouter