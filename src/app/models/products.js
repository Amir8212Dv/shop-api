import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title      : { type : String, required : true, trim : true },
    short_desc : { type : String, required : true, trim : true },
    total_desc : { type : String, required : true, trim : true },
    images     : { type : [String], required : true },
    tags       : { type : [String], default : [] },
    category   : { type : mongoose.Types.ObjectId, required : true },
    comments   : { type : [] },
    like       : { type : [mongoose.Types.ObjectId], default : true },
    bookemark  : { type : [mongoose.Types.ObjectId], default : [] },
    price      : { type : Number, required : true },
    discount   : { type : Number , default : 0 },
    count      : { type : Number, required : true },
    type       : { type : String, required : true },
    time       : { type : String },
    format     : { type : String },
    teacher    : { type : String },
    feature    : { type : Object , default : {
        length : 0,
        width  : 0,
        height : 0,
        weight : 0,
        color  : '',
        model  : '',
        madein : ''
    }
    },
})

const model = mongoose.model('product' , schema)

export default model