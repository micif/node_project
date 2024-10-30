const mongoose=require("mongoose")
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uniqe:true
    },
    icon:{
        type:String
    }

},
{
    timestamps:true
})
module.exports = mongoose.model('Category',categorySchema) 