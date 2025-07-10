 const express=require('express');
const { Login, Signup } = require('../controller/Auth');
 const router=express.Router();
 const{auth}=require("../middleware/auth");


 console.log("auth controller",{ Login, Signup});
 
 console.log("auth controller",{ auth});

 router.post("/signup",Signup);
 router.post("/login",Login);

 module.exports=router;