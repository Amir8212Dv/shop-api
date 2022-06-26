import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : { type : String , trim : true},
    text  : { type : String , trim : true},
    image : { type : String , required : true},
})

const model = mongoose.model('slider' , schema)

export default model