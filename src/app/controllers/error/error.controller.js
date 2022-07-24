class ErrorController {
    sendToErrorPage(req , res , next) {
        try {
            res.render('error.ejs')
        } catch (error) {
            next(error)
        }
    }
}

export default new ErrorController()