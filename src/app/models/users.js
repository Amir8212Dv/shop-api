import mongoose from "mongoose";

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
    bills      : { type : [], default : [] },
    discount   : { type : Number , default : 0},
    role : {type : String , default : 'USER'}
} , {
    timestamps : true,
    versionKey : false
})

userSchema.index({first_name : 'text' , last_name : 'text' , mobile : 'text' , email : 'text'})

const userModel = mongoose.model('user' , userSchema)

export default userModel

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE0MjMwNTI0MSIsImlhdCI6MTY1NzE4NjkyOSwiZXhwIjoxNjU3MjczMzI5fQ.xudG0TIOqxfAFWOq3HDg5s6cZNbvre7560uWcyY_eyI
