import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : { type : String , trim : true},
    text  : { type : String , trim : true},
    image : { type : String , required : true},
} , {
    versionKey : false
})

const sliderModel = mongoose.model('slider' , schema)

export default sliderModel