import dotenv from 'dotenv'
import Application from './app/server.js'
import routes from './app/routes/routes.js'
dotenv.config()

const PORT = process.env.PORT

const MONGODB_URL = process.env.MONGODB_URL

new Application(PORT , MONGODB_URL , routes)
