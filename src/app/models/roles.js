import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
    title : {type : String , required : true , trim : true , unique : true},
    permission : {type : [String] , default : [] , ref : 'permission'}
} , {
    versionKey : false,
    toJSON : {
        virtuals : true
    }
})

const roleModel = mongoose.model('role' , roleSchema)

export default roleModel