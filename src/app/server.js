import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import path from 'path'
import morgan from 'morgan'

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
        this.createRoutes()
        this.errorHandling()
    }
    serverConfig() {
        this.#app.use(morgan('dev'))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended : true}))
        this.#app.use(express.static(path.join(process.argv[1] , '..' , '..' , 'public')))
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
    createRoutes() {
        this.#app.use(this.#routes)
    }
    errorHandling() {
        this.#app.use((req , res) => {
            res.status(404).send({
                status : 404,
                success : false,
                message : 'page not find'
            })
        })
        this.#app.use((error , req , res , next) => {
            const status = error.status || 500
            const message = error.message || 'internal server error!'
            res.status(status).send({
                status,
                success : false,
                message
            })
        })
    }

}

export default Application