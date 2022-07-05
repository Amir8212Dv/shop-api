import joi from 'joi'

export const createProductValidationSchema = joi.object({
    title : joi.string().min(3).max(30),
    text : joi.string(),
    short_text : joi.string(),
    price : joi.string(),
    discount : joi.string(),
    count : joi.number(),
    features : joi.object({
        length : joi.number(),
        width  : joi.number(),
        height : joi.number(),
        weight : joi.number(),
        color  : joi.string(),
        model  : joi.string(),
        madein : joi.string()
    }),
    tags : joi.array().items(joi.string()),
    category : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('category should be a valid mongoDB objectId')),
    _id : joi.any(),
    images : joi.array().items(joi.string())
})
export const updateProductValidationSchema = joi.object({
    title : joi.string().min(3).max(30),
    text : joi.string(),
    short_text : joi.string(),
    price : joi.string(),
    discount : joi.string(),
    count : joi.number(),
    features : joi.object({
        length : joi.number(),
        width  : joi.number(),
        height : joi.number(),
        weight : joi.number(),
        color  : joi.string(),
        model  : joi.string(),
        madein : joi.string()
    }),
    tags : joi.array().items(joi.string()),
    category : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('category should be a valid mongoDB objectId'))
})
