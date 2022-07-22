import SocketController from "./socketController.js"

const socketHandler = io => {
    const controller = new SocketController(io)
    controller.initConnection()
    controller.createNamespaces()
}
export default socketHandler