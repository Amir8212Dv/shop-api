import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    author : { type : mongoose.Types.ObjectId, required : true },
    comment   : { type : String, trim : true , required : true},
    parent : { type : mongoose.Types.ObjectId , ref : 'blog.comments'}
},{
    timestamps : true,
    versionKey : false
})

const schema = new mongoose.Schema({
    author   : { type : mongoose.Types.ObjectId, required : true },
    title    : { type : String, required : true, trim : true , unique : true },
    text     : { type : String, required : true, trim : true },
    image    : { type : String },
    tags     : { type : [String], default : [] },
    category : { type : [mongoose.Types.ObjectId], required : true },
    comments : { type : [commentsSchema], default : [] },
    like     : { type : [mongoose.Types.ObjectId], default : [] },
    bookmark : { type : [mongoose.Types.ObjectId], default : [] }
} , {
    timestamps : true,
    versionKey : false
})

const blogModel = mongoose.model('blog' , schema)

export default blogModel