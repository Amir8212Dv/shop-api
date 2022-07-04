import joi from 'joi'

const courseValidationSchema = joi.object({
    title : joi.string().min(3).max(30),
    text : joi.string(),
    short_text : joi.string(),
    price : joi.string(),
    discount : joi.string(),
    tags : joi.array().items(joi.string()),
    category : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('category should be a valid mongoDB objectId')),
    status : joi.string().pattern(/(notStarted|started|ended)/)
})

export default courseValidationSchema