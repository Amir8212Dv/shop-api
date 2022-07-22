
class SupportController {

    async renderChattRoom(req , res , next) {
        try {
            
            res.render('chat.ejs')
        } catch (error) {
            next(error)
        }
    }
}

export default new SupportController()