import joi from 'joi'

export const createEpisodeValidationSchema = joi.object({
    title : joi.string().min(3),
    text : joi.string().allow(''),
    type : joi.string().pattern(/(unlock|lock)/i),
    video : joi.string(),
    courseId : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('courseId should be a valid mongoDB objectId')),
    chapterId : joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error('chapterId should be a valid mongoDB objectId')),
    _id : joi.any(),
    time : joi.number()
})

