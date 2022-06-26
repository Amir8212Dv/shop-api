import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    }
})

const model = mongoose.model('category' , schema)

export default model