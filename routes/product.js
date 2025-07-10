const express=require('express');
const router=express.Router();
const{createProduct,ShowAllProducts,UpdateProducts,DeleteProduct}=require('../controller/Product');
const{auth,isAdmin}=require("../middleware/auth");
router.post("/createproduct",auth,isAdmin,createProduct);
router.get("/showallproduct",ShowAllProducts);
router.put("/updateproduct",auth,isAdmin,UpdateProducts);
router.delete("/deleteproduct",auth,isAdmin,DeleteProduct);

module.exports=router;