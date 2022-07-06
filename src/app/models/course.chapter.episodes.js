import mongoose from 'mongoose'


const episodeSchema = new mongoose.Schema({
    title : {type : String, required : true , trim : true},
    text : {type : String, default : '' , trim : true},
    time : {type : Number , required : true , min : 0},
    videoAddress : {type : String , required : true},
    type : {type : String , default : 'unlock'},
    courseId : { type : mongoose.Types.ObjectId , ref : 'course', required : true},
    chapterId : { type : mongoose.Types.ObjectId , ref : 'chapter' , required : true}
} , {
    versionKey : false,
    timestamps : true,
    toJSON : {
        virtuals : true
    }
})


const episodeModel = mongoose.model('episode' , episodeSchema)

export default episodeModel