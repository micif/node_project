const mongoose=require("mongoose")
const cartSchema=new mongoose.Schema({
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
    amount:{
        type:Number,
        default:1
    }
},
{
    timestamps:true
})
module.exports = mongoose.model('Cart',cartSchema) 