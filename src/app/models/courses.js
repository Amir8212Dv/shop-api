import mongoose from 'mongoose'
import commentSchema from './comments.schema.js'



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
    time : {type : Number , default : 0 , min : 0},
    status : {type : String , default : 'notStarted'},
    teacher : {type : mongoose.Types.ObjectId , required : true},
    chapters : {type : [mongoose.Types.ObjectId] , ref: 'chapter' , default : []},
    students : {type : [mongoose.Types.ObjectId] , default : []}
} , {
    versionKey : false,
    timestamps : true,
    toJSON : {
        virtuals : true
    }
})

courseSchema.virtual('chaptersList' , {
    localField : 'chapters',
    foreignField : '_id',
    ref : 'chapter'
})

courseSchema.pre('find' , function(next) {
    this.populate([{path : 'chapters'}])
    next()
})
courseSchema.pre('findOne' , function(next) {
    this.populate([{path : 'chapters'}])
    next()
})

courseSchema.index({title : 'text' , text : 'text' , short_text : 'text'})

const courseModel = mongoose.model('course' , courseSchema)

export default courseModel