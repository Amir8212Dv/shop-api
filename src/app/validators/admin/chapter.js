import joi from 'joi'

const chapterValidationSchema = joi.object({
    titel : joi.string().min(3).max(30) ,
    text : joi.string(),
    id : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('id should be a valid mongoDB objectId')),
})

export default chapterValidationSchema