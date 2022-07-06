import mongoose from "mongoose";
import commentsSchema from "./comments.schema.js";

const productFeaturesSchema = new mongoose.Schema({
    length : {type : Number , required : true},
    width  : {type : Number , required : true},
    height : {type : Number , required : true},
    weight : {type : Number , required : true},
    color  : {type : String},
    model  : {type : String},
    madein : {type : String}
} , {
    versionKey : false,
    _id : false,
    id : false
})

const productSchema = new mongoose.Schema({
    title      : { type : String, required : true, trim : true },
    text       : { type : String, required : true, trim : true },
    short_text : { type : String, required : true, trim : true },
    images     : { type : [String], required : true },
    tags       : { type : [String], default : [] },
    category   : { type : mongoose.Types.ObjectId, required : true },
    comments   : { type : [commentsSchema] , default : [] },
    likes      : { type : [mongoose.Types.ObjectId], default : [] },
    bookemarks : { type : [mongoose.Types.ObjectId], default : [] },
    price      : { type : Number, required : true },
    discount   : { type : Number , default : 0 },
    count      : { type : Number, required : true },
    suplier    : { type : mongoose.Types.ObjectId , required : true },
    features   : { type : productFeaturesSchema , required : true},
} , {
    versionKey : false,
    toJSON : {
        virtuals : true
    }
})

productSchema.virtual('imagesURL').get(function(){
    return this.images.map(image => `${process.env.BASE_URL}${image}`)
})

productSchema.index({title : 'text' , text : 'text' , short_text : 'text'})

const productModel = mongoose.model('product' , productSchema)

export default productModel