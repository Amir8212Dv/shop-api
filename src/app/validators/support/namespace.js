import joi from 'joi'

export const namespaceValidationSchema = joi.object({
    title : joi.string(),
    endpoint : joi.string()
})