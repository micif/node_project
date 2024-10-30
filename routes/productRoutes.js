const express=require("express")
const router=express.Router()
const productController=require("../controllers/productController")
router.post("/",productController.creatNewProduct)
router.get("/",productController.getAllProduct)
router.put("/",productController.updateProduct)
router.delete("/",productController.deleteProduct)

module.exports=router