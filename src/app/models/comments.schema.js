import mongoose from 'mongoose'

const answerCommentSchema = new mongoose.Schema({
    author : { type : mongoose.Types.ObjectId, required : true },
    comment   : { type : String, trim : true , required : true},
    show : {type : Boolean , default : false},
    parent : {type : mongoose.Types.ObjectId , required : true}
},{
    timestamps : {createdAt : true , updatedAt : false},
    versionKey : false
})

const commentsSchema = new mongoose.Schema({
    author : { type : mongoose.Types.ObjectId, required : true },
    comment   : { type : String, trim : true , required : true},
    answers : { type : [answerCommentSchema] , default : []},
    show : {type : Boolean , default : false}
},{
    timestamps : {createdAt : true , updatedAt : false},
    versionKey : false
})

const commentModel = mongoose.model('comment' , commentsSchema)

export default commentModel