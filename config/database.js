const mongoose=require('mongoose');
require('dotenv').config();

exports.connect=()=>{
    mongoose.connect(process.env.BASE_URL)
    .then(()=>console.log("data base connection succesfull"))
    .catch((error)=>{
        console.log("error in connection");
        console.log(error);
        process.exit(1);    
    })
}