import joi from 'joi'

export const createCategoryValidationSchema = joi.object({
    title : joi.string().required().min(4).max(30),
    parent : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('parent should be a valid mongoDB objectId'))
})
export const updateCategoryValidationSchema = joi.object({
    title : joi.string().required().min(4).max(30)
})