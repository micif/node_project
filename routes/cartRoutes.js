const express=require("express")
const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const cartController=require("../controllers/cartController")
router.use(verifyJWT)
router.post("/",cartController.addToCart)
router.get("/",cartController.getAllCart)
router.put("/",cartController.updateCart)
router.delete("/",cartController.deleteCart)

module.exports=router