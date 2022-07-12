import mongoose from "mongoose";
import commentsSchema from "./comments.schema.js";


const blogSchema = new mongoose.Schema({
    author   : { type : mongoose.Types.ObjectId, required : true },
    title    : { type : String, required : true, trim : true , unique : true },
    text     : { type : String, required : true, trim : true },
    image    : { type : String },
    tags     : { type : [String], default : [] },
    category : { type : [mongoose.Types.ObjectId], required : true },
    comments : { type : [mongoose.Types.ObjectId], default : [] },
    likes    : { type : [mongoose.Types.ObjectId], default : [] },
    bookmarks: { type : [mongoose.Types.ObjectId], default : [] }
} , {
    timestamps : true,
    versionKey : false,
    toJSON : {
        virtuals : true
    }
})

blogSchema.index({title : 'text'})

blogSchema.virtual('bookmarksCount').get(function(){
    return this.bookmarks.length
})
blogSchema.virtual('likesCount').get(function(){
    return this.likes.length
})

const blogModel = mongoose.model('blog' , blogSchema)

export default blogModel