import mongoose from 'mongoose'

const commentsSchema = new mongoose.Schema({
    author : { type : mongoose.Types.ObjectId, required : true },
    comment   : { type : String, trim : true , required : true},
    parent : { type : mongoose.Types.ObjectId , ref : 'blog.comments'}
},{
    timestamps : true,
    versionKey : false
})

export default commentsSchema