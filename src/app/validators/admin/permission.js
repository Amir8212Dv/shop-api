import joi from 'joi'

export const createPermissionValidationSchema = joi.object({
    title : joi.string().required(),
    description : joi.string()
})