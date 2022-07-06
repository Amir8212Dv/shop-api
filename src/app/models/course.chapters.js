import mongoose from 'mongoose'

const chapterSchema = new mongoose.Schema({
    title : {type : String , required : true , trim : true},
    text : {type : String , default : '' , trim : true},
    episodes : {type : [mongoose.Types.ObjectId] , default : []},
    courseId : { type : mongoose.Types.ObjectId , ref:'course' , required : true}
} , {
    versionKey : false,
    timestamps : true
})


const chapterModel = mongoose.model('chapter' , chapterSchema)

export default chapterModel