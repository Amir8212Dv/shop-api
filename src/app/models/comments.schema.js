import mongoose from 'mongoose'

const answerCommentSchema = new mongoose.Schema({
    author : { type : mongoose.Types.ObjectId, required : true },
    comment   : { type : String, trim : true , required : true},
    show : {type : Boolean , default : false}
},{
    timestamps : true,
    versionKey : false
})

const commentsSchema = new mongoose.Schema({
    author : { type : mongoose.Types.ObjectId, required : true },
    comment   : { type : String, trim : true , required : true},
    answers : { type : [answerCommentSchema] , default : []},
    show : {type : Boolean , default : false}
},{
    timestamps : true,
    versionKey : false
})

export default commentsSchema