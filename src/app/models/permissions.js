import mongoose from 'mongoose'

const permissionSchema = new mongoose.Schema({
    title : { type : String , required : true , unique : true},
    description : {type : String , default : ''}
} , {
    versionKey : false,
})

const permissionModel = mongoose.model('permission' , permissionSchema)

export default permissionModel