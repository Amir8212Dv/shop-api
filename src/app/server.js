import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import path from 'path'
import morgan from 'morgan'
import httpError from 'http-errors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from 'swagger-jsdoc'
import redis from './utils/initRedis.js'


class Application {
    #app = express()
    #PORT
    #DB_URL
    #routes

    constructor(PORT , DB_URL , routes) {
        this.#PORT = PORT
        this.#DB_URL = DB_URL
        this.#routes = routes
        this.serverConfig()
        this.createServer()
        this.connectDatabase()
        this.connectRedis()
        this.createRoutes()
        this.errorHandling()
    }
    serverConfig() {
        this.#app.use(morgan('dev'))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended : true}))
        this.#app.use(express.static(path.join(process.argv[1] , '..' , '..' , 'public')))
        this.#app.use('/api-doc' , swaggerUi.serve , swaggerUi.setup(swaggerDocs({
            swaggerDefinition : {
                info : {
                    title : 'shop api',
                    version : '1.0.0',
                    description : 'none'
                },
                servers : [
                    {
                        url : 'http://localhost:4000'
                    }
                ]
            },
            apis : ['./src/app/routes/*/*.js']
        })))
    }
    createServer() {
        const server = http.createServer(this.#app)
        server.listen(this.#PORT , () => {
            console.log('server is running on : http://localhost:' + this.#PORT)
        })
    }
    connectDatabase() {
        mongoose.connect(this.#DB_URL , (err) => {
            if(err) return console.log('connnecting to dabase faild')
            console.log('connected to database successfully')
        })

        process.on('SIGINT' , () => {
            mongoose.connection.close(true)
        })
    }
    connectRedis() {
        redis.connect()
        redis.on('connect' , () => console.log('connected to redis successfully'))
    }
    createRoutes() {
        this.#app.use(this.#routes)
    }
    errorHandling() {
        this.#app.use((req , res , next) => {
            next(httpError.NotFound('page not found'))
        })
        this.#app.use((error , req , res , next) => {
            const internalServerError = httpError.InternalServerError()

            const status = error.status || internalServerError.status
            const message = error.message || internalServerError.message
            res.status(status).send({
                errors : {
                    status,
                    message
                }
            })
        })
    }

}

export default Application