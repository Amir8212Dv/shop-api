import { Server } from 'socket.io'

const initSocketIo = httpServer => {

    const io = new Server(httpServer , {
        cors : {
            origin : '*'
        }
    })
    return io

}

export default initSocketIo