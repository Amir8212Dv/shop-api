import mongoose from "mongoose";

const schema = new mongoose.Schema({
    // username   : { type : String , required : true , trim : true , lowerCase : true },
    first_name : { type : String , trim : true },
    last_name  : { type : String , trim : true },
    mobile     : { type : String , required : true , unique : true },
    email      : { type : String , trim : true , lowerCase : true , unique : true },
    otp        : { type : Object , default : {
        code   : '',
        expire : 0 
    }},
    bills      : { type : [], default : [] },
    discount   : { type : Number , default : 0},
    roles : {type : [String] , default : ['USER']}
} , {
    timestamps : true,
    versionKey : false
})

const userModel = mongoose.model('user' , schema)

export default userModel