import joi from 'joi'

export const roomValidationSchema = joi.object({
    name : joi.string(),
    description : joi.string(),
    image : joi.string()
})