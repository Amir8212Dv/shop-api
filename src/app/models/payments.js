import mongoose from "mongoose";

const schema = new mongoose.Schema({
    invoiceNumber : {type : String , required : true},
    authority : {type : String , required : true},
    amount : {type : Number , required : true},
    verify : {type : Boolean , default : false},
    basket : {type : Object , required : true},
    refId : {type : String , default : undefined},
    cartHash : {type : String , default : undefined}
} , {
    timestamps : true,
    versionKey : false
})

const paymentModel = mongoose.model('payment' , schema)

export default paymentModel