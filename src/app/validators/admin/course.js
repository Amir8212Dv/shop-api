import joi from 'joi'

const courseSchema = joi.object({
    title : joi.string().min(3).max(30).trim(true),
    text : joi.string().trim(true),
    short_text : joi.string().trim(true),
    price : joi.string(),
    discount : joi.string(),
    tags : joi.array().items(joi.string().trim(true)),
    category : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
    status : joi.string().pattern(/(notStarted|started|ended)/)
})

export default courseSchema