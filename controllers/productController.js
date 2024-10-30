const Product = require("../models/Product")
const Category = require("../models/Category")
const getAllProduct=async(req,res)=>{
    const product =await Product.find().lean()
    if(!product)
    {
        return res.status(400).send("No product found")
    }
    else {
        return res.json(product)
    }
}
const creatNewProduct=async (req, res)=>{
    const{name,category,price,image}=req.body
    if(!name || !category)
    {
        return res.status(400).json({message:"The fields are requied"})
    }
     const findCategory= await Category.findById(category).lean()
     if(!findCategory)
     {
         return res.status(400).json({message:"The category is not exist"})
     }
    const product= await Product.create({name,category,price,image})
    if(!product)
    {
        return res.status(400).json({message:"Invalid Product"})
    }
    else{
        return res.status(201).json({message:`New Product ${product.name} created`})
    }
}
const updateProduct= async(req,res)=>
{
    const{_id,name,category,price,image}=req.body
    if(!name || !_id)
    {
        return res.status(400).json({message:"The field name is requied"}) 
    }
    const product=await Product.findById(_id).exec()
    if(!product)
    {
        return res.status(400).send("No product found")
    }
    product.name=name,
    product.category=category,
    product.price=price,
    product.image=image
    const updateProduct=await product.save()
    res.json(`the ${updateProduct.name} is update`)
}
const deleteProduct=async (req,res)=>{
    const{id}=req.body
    const product=await Product.findById(id).exec()
    if(!product)
    {
        return res.status(400).send("No product found")
    }
    const result =await product.deleteOne()
    res.json(`Category ${result.name} is delet`)
}
module.exports={getAllProduct,creatNewProduct,updateProduct,deleteProduct}