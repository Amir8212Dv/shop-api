import mongoose from "mongoose";

const schema = new mongoose.Schema({
    first_name : { type : String , required : true , trim : true },
    last_name  : { type : String , required : true , trim : true },
    username   : { type : String , required : true , trim : true , lowerCase : true },
    mobile     : { type : String , required : true },
    email      : { type : String , trim : true , lowerCase : true },
    password   : { type : String , required : true , min : 8 },
    otp        : { type : Object , default : {
        code   : 0,
        expire : 0 
    }},
    bills      : { type : [], default : [] },
    discount   : { type : Number , default : 0}
})

const model = mongoose.model('user' , schema)

export default model