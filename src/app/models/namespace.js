import mongoose from 'mongoose'


const namespaceSchema = new mongoose.Schema({
    title : {type : String , required : true},
    endpoint : {type : String , required : true},
    rooms : {type : [mongoose.Types.ObjectId] , default : []}
}, {
    versionKey : false
})

const namespaceModel = mongoose.model('namespace' , namespaceSchema)

export default namespaceModel