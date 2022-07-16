
class supportController {

    async renderChattRoom(req , res , next) {
        try {
            
            res.render('chat.ejs')
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default new supportController()