import mongoose from 'mongoose'
import commentSchema from './comments.schema.js'

const episodeSchema = new mongoose.Schema({
    title : {type : String, required : true , trim : true},
    text : {type : String, required : true , trim : true},
    time : {type : String , required : true},
    videoAddress : {type : String , required : true},
    type : {type : String , default : 'UNLOCK'}
})

const chapterSchema = new mongoose.Schema({
    title : {type : String , required : true , trim : true},
    text : {type : String , required : true , trim : true},
    episodes : {type : [episodeSchema] , default : []}
})


const courseSchema = new mongoose.Schema({
    title : {type : String , required : true , trim : true , unique : true},
    text : {type : String , required : true , trim : true},
    short_text : {type : String , required : true , trim : true},
    image : {type : String},
    tags : {type : [String] , default : []},
    category : {type : [mongoose.Types.ObjectId] , required : true},
    comments : {type : [commentSchema] , deafult : []},
    likes : {type : [mongoose.Types.ObjectId] , deafult : []},
    bookmarks : {type : [mongoose.Types.ObjectId] , deafult : []},
    price : {type : Number , required : true},
    discount : {type : Number , required : true},
    time : {type : String , default : '00:00:00'},
    status : {type : String , default : 'notStarted'},
    teacher : {type : mongoose.Types.ObjectId , ref : 'user' , required : true},
    chapters : {type : [chapterSchema] , default : []},
    students : {type : mongoose.Types.ObjectId , default : []}
})

courseSchema.index({title : 'text' , text : 'text' , short_text : 'text'})

const courseModel = mongoose.model('course' , courseSchema)

export default courseModel