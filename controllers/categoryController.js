const Category = require("../models/Category")
const getAllCategory=async(req,res)=>{
    const category =await Category.find({},{name:1,_id:0}).lean()
    if(!category)
    {
        return res.status(400).send("No category found")
    }
    else {
        return res.json(category)
    }
}
const creatNewCategory=async (req, res)=>{
    const{name,icon}=req.body
    if(!name)
    {
        return res.status(400).json({message:"The field name is requied"})
    }
    const duplicate=await Category.findOne({name:name}).lean()
    if(duplicate)
    {
        return res.status(409).json({message:"error data"})
    }
    const category= await Category.create({name,icon})
    if(!category)
    {
        return res.status(400).json({message:"Invalid Category"})
    }
    else{
        return res.status(201).json({message:`New category ${category.name} created`})
    }
}
const updateCategory= async(req,res)=>
{
    const{_id,name,icon}=req.body
    if(!name || !_id)
    {
        return res.status(400).json({message:"The field name is requied"}) 
    }
    const category=await Category.findById(_id).exec()
    if(!category)
    {
        return res.status(400).send("No category found")
    }
    category.name=name,
    category.icon=icon
    const updateCategory=await category.save()
    res.json(`the ${updateCategory.name} is update`)
}
const deleteCategory=async (req,res)=>{
    const{id}=req.body
    const category=await Category.findById(id).exec()
    if(!category)
    {
        return res.status(400).send("No category found")
    }
    const result =await category.deleteOne()
    res.json(`Category ${result.name} is delet`)
}
module.exports={getAllCategory,creatNewCategory,updateCategory,deleteCategory}