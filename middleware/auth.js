const jwt=require('jsonwebtoken');
require('dotenv').config();
const User=require('../models/User');

exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.body.token|| req.header("Authorization")?.replace("Bearer ","");
     if(!token){
        return res.status(400).json({
            success:false,
   message:"token is not present",
        })
     }

     try{
 const decode=await jwt.verify(token,process.env.JWT_SECRET);
 console.log(decode);
 req.user=decode;
     }
     catch(error){
         console.log(error);
    return res.status(401).json({
        success:false,
        message:"token invalid",
    })
     }
     next();
    }
    
    catch(error){
  return res.status(500).json({
        success:false,
        message:" something went wrong wentoken not present",
    })
    }
}


exports.isUser=async(req,res,next)=>{
    try{
if(req.user.accountType !=="User"){
     return res.status(401).json({
        success:false,
        message:" for user only",
    })
}
next();
    }
    catch(error){
console.log(error);
 return res.status(500).json({
            success:false,
            message:" user role not verified as user",
        }) 
    }
}

exports.isAdmin=async(req,res,next)=>{
    try{
 if(req.user.accountType!=="Admin"){
        return res.status(401).json({
        success:false,
        message:" for admin only",
    })
 }
 next();
    }
    catch(error){

console.log(error);
 return res.status(500).json({
            success:false,
            message:" user role not verified as admin",
        }) 
    }
}