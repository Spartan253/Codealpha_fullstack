const Order=require("../models/Order");

exports.createOrder=async(req,res)=>{
    try{
const {totalamount,items,userId,status}=req.body;
if(!totalamount||!items||!userId){
    return res.status(400).json({
        success:false,
        message:" all properties are not properly mentioned ",
    })
}
const order=await Order.create({
    totalamount,items,userId, status: "shipped"
})

return res.status(200).json({
    success:true,
    message:"the order is created successfully",
   data: order,
})
    }
    catch(error){
return res.status(500).json({
    success:false,
    message:"the order  creation failed ",
    error:error.message,
})
    }
}

exports.getAllOrder=async(req,res)=>{
    try{
const AllOrders=await Order.find({},{
    user:true,
    shippingaddress:true,
    orderedAt:true,
    status:true,
totalamount:true,
items:true
})

return res.status(200).json({
    success:true,
    message:"orders are created succesfully",
    data:AllOrders,
})
    }
    catch(error){

return res.status(500).json({
    success:false,
    message:"orders does not  created succesfully",
   error:error.message,
})
    }
}


exports.updateOrderStatus=async(req,res)=>{
    try{
const{userId,orderId,status}=req.body;
if(!userId || !orderId ||!status){
return res.status(400).json({
    success:false,
    message:" does not update the order status",
})
}
const UpdateOrderStatus=await Order.findByIdAndUpdate(orderId,{status},{new:true})
 
return res.status(200).json({
    success:true,
    message:"  update the order status successfully",
    data:UpdateOrderStatus,
})}
    catch(error){
return res.status(500).json({
    success:false,
    message:"  does not update the order status successfully",
    error:error.message
})
    }
}