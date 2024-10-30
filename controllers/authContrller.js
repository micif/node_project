//const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const User =require("../models/User")
const login =async (req,res)=>
{
    const {username,password}=req.body
    if(!username || !password)
    {
        return res.status(400).json({message:"All fields are requied"})
    }
    const foundUser= await User.findOne({username}).lean()
    if(!foundUser||!foundUser.active)
    {
        return res.status(401).json({message:"Unauthorized"})
    }
    //const match=await bcrypt.compare(password,foundUser.password)
    // if(!match)
    // {
    //     return res.status(401).json({message:"Unauthorized"})
    // }
    const userInfo={_id:foundUser._id,
                    name:foundUser.name,
                    roles:foundUser.roles,
                    username:foundUser.username,
                    emai:foundUser.email}
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
}
const register =async (req,res)=>
{
    const {username,password,name,email,phone}=req.body
    if(!username || !password|| !name || !email)
    {
        return res.status(400).json({message:"All fields are requied"})
    }
    const duplicate=await User.findOne({username:username}).lean()
    if(duplicate)
    {
        return res.status(409).json({message:"error data"})
    }
    //const hashePwd= await bcrypt.hash(password,10) password:-hashePwd  ולהוסף ב bcrypt  להתקין את 
    const user= await User.create({username,password,name,email,phone})
    if(user)
    {
        return res.status(201).json({message:`New user ${user.username} created`})
    }
    else{
        return res.status(400).json({message:"invalid user received"})
    }
}
module.exports={login,register}