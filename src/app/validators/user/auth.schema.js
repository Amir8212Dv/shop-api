import joi from 'joi'

export const userSchema = joi.object({
    first_name : joi.string().trim().lowercase().required(),
    last_name : joi.string().trim().lowercase().required(),
    email : joi.string().trim().required().lowercase().email().error(new Error('please inter a valid email')),
    password : joi.string().required().trim().min(8).error(new Error('password must be longer than 8 characters')),
    username : joi.string().trim().lowercase().required().min(4).error(new Error('username must be longer than 4 characters')),
    mobile : joi.string().required()
    .pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/)
    .error(new Error('please enter a valid phone number'))
})
