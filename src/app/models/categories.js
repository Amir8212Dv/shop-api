import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : { type : String, required : true , unique : true },
    parent : {type : mongoose.Types.ObjectId , default : undefined}
})

const categoryModel = mongoose.model('category' , schema)

export default categoryModel