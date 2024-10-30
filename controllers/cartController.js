const Cart = require("../models/Cart")
const addToCart= async (req,res)=>
{
    const {product,amount}=req.body
if(!product)
{
    return res.status(400).json({message:"product is required"})
}
const cart= await Cart.create({user:req.user._id,product,amount})
if(!cart)
{
    return res.status(400).json({message:"Invalid cart"})
}
return res.status(201).json("new product added")
}

const getAllCart=async (req,res)=>
{
    const cart=await Cart.find({user:req.user._id},{_id:0,amount:1,product:1}).populate("product",{name:1,image:1,_id:0})
    res.json(cart)
}

const deleteCart=async (req,res)=>
{
    const {id}=req.body
    const cart= await Cart.findById(id).populate("product").exec()
    if(!cart)
    {
        return res.status(400).send("No cart found")
    }
    const result =await cart.deleteOne()
    res.json(`Product ${cart.product.name} is delet`)
}

const updateCart=async (req,res)=>{
    const{id,amount}=req.body
    const cart= await Cart.findById(id).populate("product").exec()
    if(!cart)
    {
        return res.status(400).send("No cart found")
    }
    cart.amount=amount
    const update=await cart.save()
    res.json(`update ${update.product.name}`)
}
module.exports={addToCart,getAllCart,deleteCart,updateCart}