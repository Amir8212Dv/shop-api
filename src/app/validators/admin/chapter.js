import joi from 'joi'

export const createChapterValidationSchema = joi.object({
    title : joi.string().min(3).max(30) ,
    text : joi.string(),
    courseId : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('id should be a valid mongoDB objectId')),
})

export const updateChapterValidationSchema = joi.object({
    title : joi.string().min(3).max(30),
    text : joi.string()
})