import socketController from "./socketController.js"

const socketHandler = io => {
    new socketController(io).initConnection()
    new socketController(io).createNamespaces()
}
export default socketHandler