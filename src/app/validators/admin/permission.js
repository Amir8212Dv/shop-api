import joi from 'joi'

export const createPermissionValidationSchema = joi.object({
    title : joi.string().required(),
    description : joi.string()
})

export const updatePermissionValidationSchema = joi.object({
    title : joi.string(),
    description : joi.string()
})