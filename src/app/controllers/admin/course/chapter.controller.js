import autoBind from "auto-bind"
import courseModel from "../../../models/courses.js"
import chapterValidationSchema from "../../../validators/admin/chapter.js"

class chapterController {

    constructor(){
        autoBind(this)
    }

    async addChapter(req , res , next) {
        try {
            await chapterValidationSchema.validateAsync(req.body)
            const {id , title , text} = req.body

            const course = await courseModel.findByIdAndUpdate(id , {$push : {chapters : {title , text}}})
            
        } catch (error) {
            next(error)
        }
    }
    async getChapter(req , res , next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async editChapter(req , res , next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async deleteChapter(req , res , next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
} 