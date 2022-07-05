import joi from 'joi'

const validateObjectId = joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('id is not valid'))

export default validateObjectId