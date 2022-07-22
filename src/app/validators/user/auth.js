import joi from 'joi'

export const signupUserValidationSchema = joi.object({
    first_name : joi.string().required(),
    last_name : joi.string().required(),
    email : joi.string().lowercase().email().error(new Error('please inter a valid email')),
    password : joi.string().min(8).required(),
    mobile : joi.string().required()
    .pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/)
    .error(new Error('please enter a valid phone number'))
})

export const loginWithPasswordValidationSchema = joi.object({
    email : joi.string().lowercase().email().error(new Error('please inter a valid email')),
    password : joi.string().required(),
    mobile : joi.string()
    .pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/)
    .error(new Error('please enter a valid phone number'))
})
export const loginWithOtpValidationSchema = joi.object({
    mobile : joi.string().required()
    .pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/)
    .error(new Error('please enter a valid phone number'))
})
export const checkOtpValidationSchema = joi.object({
    code : joi.string(),
    mobile : joi.string().required()
    .pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/)
    .error(new Error('please enter a valid phone number'))
})