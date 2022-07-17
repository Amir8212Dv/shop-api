import socketController from "./socketController.js"

const socketHandler = io => {
    const controller = new socketController(io)
    controller.initConnection()
    controller.createNamespaces()
}
export default socketHandler