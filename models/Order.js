const mongoose=require('mongoose');
const OrderSchema=new mongoose.Schema({
 user:{
    type:mongoose.Schema.ObjectId,ref:"User"
 }, 
 items:[
    {
        product:{
            type:mongoose.Schema.ObjectId,ref:"Product"
        }

    }
 ],
 totalamount:{
    type:Number
},
   status:{
        type:String,
         enum: ["pending", "shipped", "delivered", "cancelled"],
        default:"pending",
    },
    shippingaddress:{
type:String,
    },
    orderedAt:{
        type:Date,
        default:Date.now,
    }
 
})
module.exports=mongoose.model('Order',OrderSchema);