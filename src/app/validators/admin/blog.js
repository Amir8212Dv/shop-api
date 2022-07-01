import joi from 'joi'

export const createBlogSchema = joi.object({
    title : joi.string().trim().required().min(3).max(30),
    text : joi.string().trim(),
    short_text : joi.string().trim(),
    tags : joi.array().min(0).max(30),
    category : joi.array().items(joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)).min(1).max(10)
})