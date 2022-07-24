import mongoose from "mongoose";
import courseModel from "./courses.js";
import productModel from "./products.js";


const userSchema = new mongoose.Schema({
    first_name : { type : String , trim : true , required : true },
    last_name  : { type : String , trim : true , required : true },
    mobile     : { type : String , required : true , unique : true },
    email      : { type : String , trim : true , lowerCase : true , unique : true , sparse : true },
    otp        : { type : Object , default : {
        code   : '',
        expire : 0 
    }},
    bills      : { type : [mongoose.Types.ObjectId], default : [] },
    discount   : { type : Number , default : 0},
    role : {type : String , default : 'USER'},
    basket : {type : mongoose.Types.ObjectId},
    password : {type : String , required : true},
    courses : {type : [mongoose.Types.ObjectId] , default : []},
    products : {type : [mongoose.Types.ObjectId] , default : []}
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

