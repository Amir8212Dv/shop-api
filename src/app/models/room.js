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
    type : {type : String , default : 'message'}
}, {
    versionKey : false,
    timestamps : true
})

const roomSchema = new mongoose.Schema({
    name : { type : String , required : true , unique : true},
    description : {type : String, default : ''},
    image : {type : String , default : '/images/defaultRoom.jpg'},
    messages : {type : [messageSchema] , default : []},
    for : {type : mongoose.Types.ObjectId , required : true}
}, {
    versionKey : false
})

const roomModel = mongoose.model('room' , roomSchema)


export default roomModel