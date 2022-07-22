import converstationModel from '../models/converstation.js'
import userModel from '../models/users.js'
import path from 'path'
import fs from 'fs'
import createObjectId from '../utils/createObjectId.js'

class SocketController {
    #io
    #user
    constructor(io) {
        this.#io = io
    }

    initConnection() {
        this.#io.use(async (socket , next) => {
            const cookies = socket.request.headers.cookie
            if(!cookies) return
            const userId = cookies.split('userId=')[1]
            const user = await userModel.findById(userId)
            this.#user = user
            next()
        })

        this.#io.on('connection' , async socket => {
            const namespaces = await converstationModel.find({} , {title : 1 , endpoint : 1}).sort({_id : -1})

            socket.emit('namespacesList' , namespaces)
            socket.emit('userInfo' , {senderId : this.#user._id.toString() , senderName : `${this.#user.first_name || ''} ${this.#user.last_name || ''}`})
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
            await converstationModel.updateOne(
                {_id : namespace._id , 'rooms.name' : roomName},
                {$push : {'rooms.$.messages' : createMessage}}
            )

            this.#io.of(`/${namespace.endpoint}`).in(roomName).emit('newwMessage' , createMessage)
        })
        
    }
}

export default SocketController