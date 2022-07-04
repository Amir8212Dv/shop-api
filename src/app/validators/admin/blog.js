import joi from 'joi'

const blogValidationSchema = joi.object({
    title : joi.string().required().min(3).max(30),
    text : joi.string(),
    short_text : joi.string(),
    tags : joi.array().min(0).max(30),
    category : joi.array().items(joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)).error(new Error('category should be a valid mongoDB objectId')).min(1).max(10)
})

export default blogValidationSchema