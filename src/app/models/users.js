import mongoose from "mongoose";
import courseModel from "./courses.js";
import productModel from "./products.js";


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
    totalPrice : {type : Number , default : 0}
})

const userSchema = new mongoose.Schema({
    // username   : { type : String , required : true , trim : true , lowerCase : true },
    first_name : { type : String , trim : true },
    last_name  : { type : String , trim : true },
    mobile     : { type : String , required : true , unique : true },
    email      : { type : String , trim : true , lowerCase : true , unique : true , sparse : true },
    otp        : { type : Object , default : {
        code   : '',
        expire : 0 
    }},
    bills      : { type : [mongoose.Types.ObjectId], default : [] },
    discount   : { type : Number , default : 0},
    role : {type : String , default : 'USER'},
    basket : {type : basketSchema}
} , {
    timestamps : true,
    versionKey : false,
    toObject : {
        virtuals : true
    },
    toJSON : {
        virtuals : true
    }
})


userSchema.index({first_name : 'text' , last_name : 'text' , mobile : 'text' , email : 'text'})

const userModel = mongoose.model('user' , userSchema)

export default userModel

