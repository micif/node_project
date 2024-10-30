require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connectDB=require("./config/dbConn")
const corsOptions=require("./config/corsOptions")
const { default: mongoose } = require("mongoose")
const PORT=process.env.PORT || 7001
const app=express()
connectDB()
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static("public"))
app.use("/api/auth",require("./routes/authRoutes"))
app.use("/api/category",require("./routes/categoryRoutes"))
app.use("/api/product",require("./routes/productRoutes"))
app.use("/api/cart",require("./routes/cartRoutes"))
app.get("/",(req,res)=>
{
res.send("this is home page")
})
mongoose.connection.once('open',()=>
{
    console.log('Connected to MongoDB')
    app.listen(PORT,()=>{console.log(`Server run on port ${PORT}`)})
})
mongoose.connection.on('error',err=>{
    console.log(err)
})