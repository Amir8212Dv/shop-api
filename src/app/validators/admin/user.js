import joi from 'joi'


export const updateUserValidationSchema = joi.object({
    first_name : joi.string(),
    last_name : joi.string(),
    email : joi.string().lowercase().email().error(new Error('please inter a valid email')),
    password : joi.string().min(8)
})