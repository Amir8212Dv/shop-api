import mongoose from 'mongoose'
import blogModel from './blogs.js'
import courseModel from './courses.js'
import productModel from './products.js'

// const answerCommentSchema = new mongoose.Schema({
//     author : { type : mongoose.Types.ObjectId, required : true },
//     comment   : { type : String, trim : true , required : true},
//     show : {type : Boolean , default : false},
//     parent : {type : mongoose.Types.ObjectId , required : true}
// },{
//     timestamps : {createdAt : true , updatedAt : false},
//     versionKey : false
// })

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

// commentsSchema.pre('deleteOne' , async function(next) {
//     if(this.for === 'blog'){
//         await blogModel.updateOne({comments : this._id} , {$pull : {comments : {_id : this._id}}})
//     } else if(this.for === 'product') {
//         await productModel.updateOne({comments : this._id} , {$pull : {comments : {_id : this._id}}})
//     } else if (this.for === 'course') {
//         await courseModel.updateOne({comments : this._id} , {$pull : {comments : {_id : this._id}}})
//     }
//     next()
// })

const commentModel = mongoose.model('comment' , commentsSchema)

export default commentModel