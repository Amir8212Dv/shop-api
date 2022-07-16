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

            // socket.on('joinNamespace' , endpoint => {
            //     this.createNamespaces(endpoint)
            // })
            
        })
    }
    // async createNamespaces(endpoint) {
    //     const namespace = await converstationModel.findOne({endpoint} , {'rooms.messages' : 0})
    //     this.#io.of(`/${endpoint}`).on('connection' , socket => {


    //         socket.emit('roomsList' , namespace.rooms)

    //         socket.on('joinRoom' , roomName => {
    //             socket.join(roomName)

    //             this.#io.of(`/${endpoint}`).in(roomName).emit('amir' , 'a')
    //         })

    //     })

    // }

    async createNamespaces() {

        const namespaces = await converstationModel.find({} , {'rooms.message' : 0})

        namespaces.forEach(space => {
            this.#io.of(`/${space.endpoint}`).on('connection' , socket => {
                socket.emit('roomsList' , space.rooms)
                socket.on('joinRoom' , async roomName => {
                    const lastestRoom = Array.from(socket.rooms)[1]
                    if(lastestRoom) await socket.leave(lastestRoom)
                    socket.join(roomName)
                    
                    console.log(socket.rooms)
                    
                    
                    const roomInfo = await converstationModel.findOne({_id : space._id , 'rooms.name' : roomName} , {'rooms.$' : 1})
                    const room = roomInfo.rooms[0]
                    const onlineUsers = await socket.in(room.name).allSockets()
                    this.#io.of(`/${space.endpoint}`).in(roomName).emit('roomInfo' , {room , onlineUsers : Array.from(onlineUsers)})
                    socket.on('disconnect' , () => {
                        this.#io.of(`/${space.endpoint}`).in(roomName).emit('roomInfo' , {room , onlineUsers : Array.from(onlineUsers)})
                    })
                })
            })
        })
        console.log(Object.keys(this.#io._nsps))
    }
}

export default socketController