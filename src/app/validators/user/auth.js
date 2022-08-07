import joiValidator from 'joi'
import validatePhoneNumber  from 'joi-phone-number'

const joi = joiValidator.extend(validatePhoneNumber)

export const signupUserValidationSchema = joi.object({
    first_name : joi.string().required(),
    last_name : joi.string().required(),
    email : joi.string().lowercase().email().error(new Error('please inter a valid email')),
    password : joi.string().min(8).required(),
    mobile : joi.string().required().phoneNumber()
    .error(new Error('please enter a valid phone number'))
})

export const loginWithPasswordValidationSchema = joi.object({
    email : joi.string().lowercase().email().error(new Error('please inter a valid email')),
    password : joi.string().required(),
    mobile : joi.string().phoneNumber()
    .error(new Error('please enter a valid phone number'))
})
export const loginWithOtpValidationSchema = joi.object({
    mobile : joi.string().required().phoneNumber()
    .error(new Error('please enter a valid phone number'))
})
export const checkOtpValidationSchema = joi.object({
    code : joi.string(),
    mobile : joi.string().required().phoneNumber()
    .error(new Error('please enter a valid phone number'))
})