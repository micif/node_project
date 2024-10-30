const express=require("express")
const router=express.Router()
const categoryController=require("../controllers/categoryController")
router.post("/",categoryController.creatNewCategory)
router.get("/",categoryController.getAllCategory)
router.put("/",categoryController.updateCategory)
router.delete("/",categoryController.deleteCategory)

module.exports=router