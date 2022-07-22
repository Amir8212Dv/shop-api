import mongoose from 'mongoose'
import productModel from './products.js'


const productSchema = new mongoose.Schema({
    productId : {type : mongoose.Types.ObjectId , ref : 'product' , required : true},
    count : {type : Number , default : 1},
    price : {type : Number , required : true}
})


const courseSchema = new mongoose.Schema({
    courseId : {type : mongoose.Types.ObjectId , required : true},
    price : {type : Number , required : true}
})

const basketSchema = new mongoose.Schema({
    products : {type : [productSchema] , default : []},
    courses : {type : [courseSchema] , default : []},
    totalPrice : {type : Number , default : 0},
    for : {type : mongoose.Types.ObjectId}
})

// basketSchema.pre('updateOne' , function(next) {

// })



const basketModel = mongoose.model('basket' , basketSchema)

export default basketModel