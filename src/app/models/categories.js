import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title : { type : String, required : true , unique : true },
    parent : {type : mongoose.Types.ObjectId , ref : 'category' , default : undefined}
} , {
    id : false,
    versionKey : false,
    toJSON : {
        virtuals : true
    }
})

categorySchema.virtual('children' , {
    localField : '_id',
    foreignField : 'parent',
    ref : 'category'
})

function populate(next) {
    this.populate([{path : 'children' , select : {__v : 0 , id : 0}}])
    next()
}
async function deleteCategoryChildren(next) {
    await categoryModel.deleteMany({parent : this._id})
    next()
}

categorySchema.index({title : 'text'})


categorySchema.pre('findOne' , populate)
.pre('find' , populate)

categorySchema.pre('deleteOne' , deleteCategoryChildren)
.pre('deleteMany' , deleteCategoryChildren)

const categoryModel = mongoose.model('category' , categorySchema)

export default categoryModel