import mongoose from "mongoose";
import commentsSchema from "./comments.schema.js";


const blogSchema = new mongoose.Schema({
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
    versionKey : false,
    toJSON : {
        virtuals : true
    }
})

blogSchema.virtual('imageURL').get(function(){
    return `${process.env.BASE_URL}${this.image}`
})


const blogModel = mongoose.model('blog' , blogSchema)

export default blogModel