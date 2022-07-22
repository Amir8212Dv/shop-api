import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
    title : {type : String , required : true , trim : true , unique : true},
    permissions : {type : [String] , default : []}
} , {
    versionKey : false
})

const roleModel = mongoose.model('role' , roleSchema)

export default roleModel