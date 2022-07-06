import dotenv from 'dotenv'
import Application from './app/server.js'
import routes from './app/routes/routes.js'
dotenv.config()

const PORT = process.env.PORT || 4000

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/shop'

new Application(PORT , DB_URL , routes)