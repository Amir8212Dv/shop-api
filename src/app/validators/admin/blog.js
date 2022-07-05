import joi from 'joi'

export const CreateBlogValidationSchema = joi.object({
    title : joi.string().min(3).max(30),
    text : joi.string(),
    short_text : joi.string(),
    tags : joi.array().min(0).max(30),
    category : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('category should be a valid mongoDB objectId')),
    _id : joi.any()

})
export const UpdateBlogValidationSchema = joi.object({
    title : joi.string().min(3).max(30),
    text : joi.string(),
    short_text : joi.string(),
    tags : joi.array().min(0).max(30),
    category : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('category should be a valid mongoDB objectId'))
})
