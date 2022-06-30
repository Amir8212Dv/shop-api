import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : { type : String, required : true , unique : true },
    parent : {type : mongoose.Types.ObjectId , ref : 'category' , default : undefined}
} , {
    id : false,
    versionKey : false,
    toJSON : {
        virtuals : true
    }
})

schema.virtual('children' , {
    localField : '_id',
    foreignField : 'parent',
    ref : 'category'
})

function populate(next) {
    this.populate([{path : 'children' , select : {__v : 0 , id : 0}}])
    next()
}

schema.pre('findOne' , populate)
.pre('find' , populate)

const categoryModel = mongoose.model('category' , schema)

export default categoryModel