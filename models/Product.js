const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
 name:{
    type:String,
},
price:{
type:Number,
},
stock:{
type:Number,
},
description:{
type:String,
},
imageUrl:{
type:String,
},


})

module.exports=mongoose.model("Product",ProductSchema);