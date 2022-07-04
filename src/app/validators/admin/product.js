import joi from 'joi'

const productSchema = joi.object({
    title : joi.string().min(3).max(30).trim(true),
    text : joi.string().trim(true),
    short_text : joi.string().trim(true),
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
    tags : joi.array().items(joi.string().trim(true)),
    category : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
})

export default productSchema