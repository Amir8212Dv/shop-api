import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    author : { type : mongoose.Types.ObjectId, required : true },
    text   : { type : String, trim : true }
})

const schema = new mongoose.Schema({
    author   : { type : mongoose.Types.ObjectId, required : true },
    title    : { type : String, required : true, trim : true },
    text     : { type : String, required : true, trim : true },
    image    : { type : String },
    tags     : { type : [String], default : [] },
    category : { type : mongoose.Types.ObjectId, required : true },
    comments : { type : [String], default : [] },
    like     : { type : [mongoose.Types.ObjectId], default : [] },
    bookmark : { type : [mongoose.Types.ObjectId], default : [] }
})

const model = mongoose.model('blog' , schema)

export default model