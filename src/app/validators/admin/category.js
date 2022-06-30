import joi from 'joi'

export const categorySchema = joi.object({
    title : joi.string().trim().required().min(4).max(30),
    parent : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).allow('')
})