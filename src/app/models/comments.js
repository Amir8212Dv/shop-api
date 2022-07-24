import mongoose from 'mongoose'
import blogModel from './blogs.js'
import courseModel from './courses.js'
import productModel from './products.js'


const commentsSchema = new mongoose.Schema({
    author : { type : mongoose.Types.ObjectId, required : true },
    comment   : { type : String, trim : true , required : true},
    parent : {type : mongoose.Types.ObjectId},
    show : {type : Boolean , default : false},
    for : {type : mongoose.Types.ObjectId , required : true}
},{
    timestamps : {createdAt : true , updatedAt : false},
    versionKey : false
})


const commentModel = mongoose.model('comment' , commentsSchema)

export default commentModel