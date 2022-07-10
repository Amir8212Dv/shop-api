import mongoose from 'mongoose'

const chapterSchema = new mongoose.Schema({
    title : {type : String , required : true , trim : true},
    text : {type : String , default : '' , trim : true},
    episodes : {type : [mongoose.Types.ObjectId] , ref : 'episode' , default : []},
    courseId : { type : mongoose.Types.ObjectId , ref:'course' , required : true}
} , {
    versionKey : false,
    timestamps : true
})

chapterSchema.virtual('episodesList' , {
    localField : 'episodes',
    foreignField : '_id',
    ref : 'episode'
})

chapterSchema.pre('find' , function(next) {
    this.populate([{path : 'episodes'}])
    next()
})
chapterSchema.pre('findOne' , function(next) {
    this.populate([{path : 'episodes'}])
    next()
})
const chapterModel = mongoose.model('chapter' , chapterSchema)

export default chapterModel