const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
firstname:{
    type:String,
    required:true,
    trim:true,
},
lastname:{
    type:String,
    required:true,
    trim:true,
},
email:{
    type:String,
    required:true,
    trim:true,
},
password:{
    type:String,
    required:true,
},

orderprocessing:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Orderprocessing",
    }
],
   accountType:{
    type:String,
    enum:["Admin","User"],
   },

shoppingcart:[{
 type:mongoose.Schema.Types.ObjectId,
 ref:"Shoppingcart ",
}
 
],
  token:{
    type:String,
   },
})

module.exports=mongoose.model("User",UserSchema);