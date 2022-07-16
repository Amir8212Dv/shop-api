import socketController from "./socketController.js"

const socketHandler = io => {
    const socketio = new socketController(io)
    socketio.initConnection()
    
    
    return socketio
}
export default socketHandler