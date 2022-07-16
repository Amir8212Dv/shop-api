import socketController from "./socketController.js"

const socketHandler = io => {
    const enpoint = new socketController(io).initConnection()
    new socketController(io).createNamespaces()
}
export default socketHandler