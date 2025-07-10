const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');



//Signup

exports.Signup=async(req,res)=>{
    try{
  const{email,firstname,lastname,password,confirmpassword,accountType}=req.body;
  const checkmailpresent=await User.findOne({email});
   if(!email ||!firstname ||!lastname || !password|| !confirmpassword || !accountType){
   return res.status(400).json({
    success:false,
    message:"not signup properly",
   });

   }
   //
   if(password!==confirmpassword){
     return res.status(400).json({
    success:false,
    message:"password mismatched ",
   });
   }
if(checkmailpresent){
    return res.status(400).json({
           success:false,
    message:" email already present ",
    })
}
const hashpassword=await bcrypt.hash(password,10);

const user=await User.create({
    email,firstname,lastname,password:hashpassword,accountType
})

return res.status(200).json({
    success:true,
    message:"you are signup successfully",
    user
})
    }
catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:"user does not signup successfully",
})
}
}


exports.Login=async(req,res)=>{
    const {email,password,accountType}=req.body;
    try{
if(!email ||!password ||!accountType){
             return res.status(400).json({
            success:false,
            message:"please fill all details",
        })   
    }
    const user=await User.findOne({email});
    if(!user){
         return res.status(400).json({
            success:false,
            message:"user not present",
        })  
    }

    const payload={
        email:user.email,
        id:user.id,
        accountType:user.accountType,
    }

    //generate jwt paaword 
 if(await bcrypt.compare(password,user.password)){
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
     expiresIn:"7d",
    });
     user.token=token;
   user.password=undefined;

   const options={expires:new Date(Date.now()+3*24*60*60*1000),
    httpOnly:true,
   }
   res.cookie('token',token,options).status(200).json({
    success:true,
    token,
    user,
    message:'logged in succesfully'
   })
 }
  else{
    return res.status(401).json({
        success:false,
        message:"password incorrect",
    })
  }
    }
catch(error){
 console.log(error);
        return res.status(500).json({
            success:false,
            message:"login failed",
        })
        
}
}