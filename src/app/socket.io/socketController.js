import converstationModel from '../models/converstation.js'

class socketController {
    #io
    constructor(io) {
        this.#io = io
    }

    initConnection() {
        this.#io.on('connection' , async socket => {
            console.log('client connected successfully')

            const namespaces = await converstationModel.find({} , {title : 1 , endpoint : 1}).sort({_id : -1})

            socket.emit('namespacesList' , namespaces)
            
        })
    }
    async createNamespaces() {

        const namespaces = await converstationModel.find({} , {'rooms.message' : 0})

        namespaces.forEach(space => {
            this.#io.of(`/${space.endpoint}`).on('connection' , socket => {
                socket.emit('roomsList' , space.rooms)
            })
        })
    }
}

export default socketController