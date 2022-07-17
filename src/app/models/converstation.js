import mongoose from 'mongoose'

const senderSchema = new mongoose.Schema({
    senderId : {type : mongoose.Types.ObjectId , required :true},
    senderName : {type : String , required : true}
} , {
    versionKey : false ,
    _id : false,
    id : false
})

const messageSchema = new mongoose.Schema({
    sender : {type : senderSchema , required :true},
    message : {type : String , required : true},
}, {
    versionKey : false,
    timestamps : true
})

const roomSchema = new mongoose.Schema({
    name : { type : String , required : true},
    description : {type : String, default : ''},
    image : {type : String , default : '/images/defaultRoom.jpg'},
    messages : {type : [messageSchema] , default : []}
}, {
    versionKey : false
})

const converstationSchema = new mongoose.Schema({
    title : {type : String , required : true},
    endpoint : {type : String , required : true},
    rooms : {type : [roomSchema] , default : []}
}, {
    versionKey : false
})

const converstationModel = mongoose.model('converstation' , converstationSchema)

export default converstationModel