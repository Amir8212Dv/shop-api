import joi from 'joi'

export const createRoleValidationSchema = joi.object({
    title : joi.string().required(),
    permission : joi.array().items(joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('permission should be a valid mongoDB objectId')))
})