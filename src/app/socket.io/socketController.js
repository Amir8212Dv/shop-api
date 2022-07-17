import converstationModel from '../models/converstation.js'
import cookieParser from 'cookie-parser'

class socketController {
    #io
    #userId
    constructor(io) {
        this.#io = io
    }

    initConnection() {

        this.#io.use(async (socket , next) => {
            const cookies = socket.request.headers.cookie
            if(!cookies) return
            const userId = cookies.split('userId=')[1]
            this.#userId = userId
            console.log(this.#userId)
            next()
        })

        this.#io.on('connection' , async socket => {
            const namespaces = await converstationModel.find({} , {title : 1 , endpoint : 1}).sort({_id : -1})

            socket.emit('namespacesList' , namespaces)
            socket.emit('userId' , this.#userId)
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
        socket.on('newMessage' , async ({message , sender}) => {
            console.log('a')
            const updateNamespace = await converstationModel.updateOne(
                {_id : namespace._id , 'rooms.name' : roomName},
                {$push : {'rooms.$.messages' : {sender , message}}}
            )
            this.#io.of(`/${namespace.endpoint}`).in(roomName).emit('newwMessage' , {message , sender})
        })
        
    }
}

export default socketController