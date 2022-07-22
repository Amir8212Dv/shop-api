import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import path from 'path'
import morgan from 'morgan'
import httpError from 'http-errors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from 'swagger-jsdoc'
import redis from './utils/initRedis.js'
import expressEjsLayouts from 'express-ejs-layouts'
import initSocketIo from './utils/initSocketIo.js'
import socketHandler from './socket.io/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

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
        this.initTemplateEngine()
        this.createServer()
        this.setCookieParser()
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
        this.#app.use(cors())
        this.#app.use('/api-doc' , swaggerUi.serve , swaggerUi.setup(swaggerDocs({
            swaggerDefinition : {
                openapi : '3.0.0',
                info : {
                    title : 'shop api',
                    version : '1.0.0',
                    description : 'none'
                },
                servers : [
                    {
                        url : process.env.BASE_URL,
                    },
                    {
                        url : 'http://192.168.1.5:4000',
                    }
                ]
            },
            apis : ['./src/app/routes/*/swagger/*.yaml' , './src/app/routes/*/swagger/*/*.yaml']
            }) , {explorer : true})
        )
    }
    createServer() {
        const server = http.createServer(this.#app)

        const io = initSocketIo(server)
        const socket = socketHandler(io)

        server.listen(this.#PORT , () => {
            console.log('server is running on : ' + process.env.BASE_URL)
        })
    }
    initTemplateEngine () {
        this.#app.use(expressEjsLayouts)
        this.#app.set('view engine' , 'ejs')
        this.#app.set('views' , 'resource/views')
        this.#app.set('layout extractStyles' , true)
        this.#app.set('layout extractScripts' , true)
        this.#app.set('layout' , './layouts/master.ejs')
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
    setCookieParser(){
        this.#app.use(cookieParser(process.env.COOKIE_SECRETE_KEY))
    }
    errorHandling() { 
        this.#app.use((req , res , next) => {
            next(httpError.NotFound('page not found'))
        })
        this.#app.use((error , req , res , next) => {
            const internalServerError = httpError.InternalServerError()

            const status = error.code === 11000 ? 400 : error.status || internalServerError.status
            
            const message = error.code === 11000 ? `entered ${Object.keys(error.keyValue)[0]} already exists` :
            error.message || internalServerError.message

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