import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    author   : { type : mongoose.Types.ObjectId, required : true },
    title    : { type : String, required : true, trim : true , unique : true },
    text     : { type : String, required : true, trim : true },
    image    : { type : String , default : '/images/defaultBlog.jpg'},
    tags     : { type : [String], default : [] },
    category : { type : mongoose.Types.ObjectId, required : true },
    likes    : { type : [mongoose.Types.ObjectId], default : [] },
    bookmarks: { type : [mongoose.Types.ObjectId], default : [] }
} , {
    timestamps : true,
    versionKey : false
})

blogSchema.index({title : 'text'})


const blogModel = mongoose.model('blog' , blogSchema)

export default blogModel