const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    category:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    name:{
        type:String,
        required:true
},
    price:{
        type:String,
        required:true
},
    image:{
        type:String
    }  
},
{
    timestamps:true
})
module.exports = mongoose.model('Product',productSchema) 