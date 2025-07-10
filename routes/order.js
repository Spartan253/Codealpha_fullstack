const express=require('express');
const router=express.Router();
const{updateOrderStatus,getAllOrder,createOrder}=require("../controller/Order");
const{auth,isAdmin}=require('../middleware/auth');

router.post("/createorder",createOrder);
router.get('/getallorder',auth,isAdmin,getAllOrder);
router.put('/updateorderstatus',auth,isAdmin,updateOrderStatus);

module.exports=router;

