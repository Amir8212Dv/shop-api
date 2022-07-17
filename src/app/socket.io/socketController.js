import converstationModel from '../models/converstation.js'

class socketController {
    #io
    constructor(io) {
        this.#io = io
    }

    initConnection() {
        this.#io.on('connection' , async socket => {
            const namespaces = await converstationModel.find({} , {title : 1 , endpoint : 1}).sort({_id : -1})

            socket.emit('namespacesList' , namespaces)
            
        })
    }


    async createNamespaces() {
        
        const namespaces = await converstationModel.find({} , {'rooms.message' : 0})
        
        namespaces.forEach(space => {
            this.#io.of(`/${space.endpoint}`).on('connection' , socket => {
                socket.emit('roomsList' , space.rooms)
                socket.on('joinRoom' , async roomName => {
                    const lastestRoom = Array.from(socket.rooms)[1]
                    if(lastestRoom) await socket.leave(lastestRoom)
                    socket.join(roomName)

                    
                    const roomInfo = await converstationModel.findOne({_id : space._id , 'rooms.name' : roomName} , {'rooms.$' : 1})
                    const room = roomInfo.rooms[0]
                    const onlineUsers = await socket.in(room.name).allSockets()
                    
                    this.#io.of(`/${space.endpoint}`).in(roomName).emit('roomInfo' , {room , onlineUsers : Array.from(onlineUsers)})
                    
                    socket.on('disconnect' , () => {
                        this.#io.of(`/${space.endpoint}`).in(roomName).emit('roomInfo' , {room , onlineUsers : Array.from(onlineUsers)})
                    })

                    this.newMessage(socket , space , roomName)

                })
            })
        })
    }
    newMessage(socket , namespace , roomName) {
        socket.on('newMessage' , async ({message}) => {
            console.log('____________________________________')
            console.log(namespace , roomName , message)
            console.log('____________________________________')
            const updateNamespace = await converstationModel.updateOne(
                {_id : namespace._id , 'rooms.name' : roomName},
                {$push : {'rooms.$.messages' : {sender : '62c6aa61dca419cccbe4e5eb' , message}}}
            )
        })
        
    }
}

export default socketController