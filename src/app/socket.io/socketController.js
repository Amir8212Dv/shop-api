import namespaceModel from '../models/namespace.js'
import userModel from '../models/users.js'
import path from 'path'
import fs from 'fs'
import createObjectId from '../utils/createObjectId.js'
import roomModel from '../models/room.js'

class SocketController {
    #io
    #user
    constructor(io) {
        this.#io = io
    }

    initConnection() {
        this.#io.use(async (socket , next) => {
            if(!socket.request.headers.cookie) return
            const cookies = socket.request.headers.cookie.split(';').map(cookie => ({[cookie.split('=')[0].trim()] : cookie.split('=')[1]}))
            const userId = cookies.find(cookie => cookie.userId).userId
            const user = await userModel.findById(userId)
            this.#user = user
            next()
        })

        this.#io.on('connection' , async socket => {
            const namespaces = await namespaceModel.find({} , {title : 1 , endpoint : 1}).sort({_id : 1})

            socket.emit('namespacesList' , namespaces)
            socket.emit('userInfo' , {senderId : this.#user?._id.toString() , senderName : `${this.#user?.first_name || ''} ${this.#user?.last_name || ''}`})
        })
    }

    
    async createNamespaces() {
        
        const namespaces = await namespaceModel.find({} , {'rooms.message' : 0})
        
        namespaces.forEach(space => {
            this.#io.of(`/${space.endpoint}`).on('connection' , socket => {
                socket.emit('roomsList' , space.rooms)

                socket.on('joinRoom' , async roomName => {
                    const lastestRoom = Array.from(socket.rooms)[1]
                    if(lastestRoom) await socket.leave(lastestRoom)
                    socket.join(roomName)
                    
                    const room = await roomModel.findOne({for : space._id , name : roomName})
     
                    const onlineUsers = await socket.in(room.name).allSockets()
                    
                    this.#io.of(`/${space.endpoint}`).in(roomName).emit('roomInfo' , {room , onlineUsers : Array.from(onlineUsers)})
                    
                    socket.on('disconnect' , () => {
                        this.#io.of(`/${space.endpoint}`).in(roomName).emit('roomInfo' , {room , onlineUsers : Array.from(onlineUsers)})
                    })
                    
                })

                this.newMessage(socket , space)
            })
        })
    }
    newMessage(socket , namespace) {

        socket.on('newMessage' , async ({message , sender , type}) => {
            const roomName = Array.from(socket.rooms)[1]

            const createMessage = {message , sender , type : type || 'message'}
            if(type === 'file') {
                const [fileType , fileExt] = message.fileType.split('/')
                if(fileType !== 'image') return

                const _id = createObjectId()
                const filePath = `/socket/${_id.toString()}.${fileExt}`
                createMessage._id = _id
                createMessage.message = filePath

                fs.mkdirSync('public/socket' , {recursive : true})
                fs.writeFileSync(`public${filePath}` , message.file)
            }
            await roomModel.updateOne(
                {for : namespace._id , name : roomName},
                {$push : {messages : createMessage}}
            )

            this.#io.of(`/${namespace.endpoint}`).in(roomName).emit('newMessage' , createMessage)
        })
        
    }
}

export default SocketController