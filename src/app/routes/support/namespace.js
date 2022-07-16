import express from 'express'
import namespaceController from '../../controllers/support/namespace.controller.js'

const namespaceRouter = express.Router()

namespaceRouter.post('/create' , namespaceController.createNamespace)

namespaceRouter.get('/all' , namespaceController.getNamespaces)

export default namespaceRouter