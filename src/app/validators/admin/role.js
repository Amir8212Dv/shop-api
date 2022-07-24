import joi from 'joi'

export const createRoleValidationSchema = joi.object({
    title : joi.string().required(),
    permissions : joi.array().items(joi.string())
})
export const updateRoleValidationSchema = joi.object({
    title : joi.string(),
    permissions : joi.array().items(joi.string())
})