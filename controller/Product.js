const Product=require("../models/Product");
const User = require("../models/User");

exports.createProduct=async(req,res)=>{
    try{
   const{name,price,stock,description,imageUrl}=req.body;
const userId = req.user.id;

const Admindetails=await User.findById(userId);
if(!Admindetails){
    return res.status(400).json({
success:false,
message:"Admin detail not found ",
    })
}
const newProduct=await Product.create({
    name,price,stock,description,imageUrl
})
return res.status(200).json({
    success:true,
    message:'product created successfullly',
    data:newProduct
})

    }
    catch(error){
 console.error(error);
  return res.status(500).json({
    success:false,
    message:"product does not create dsuccesfully",
    error:error.message,
  })
    }
}


exports.ShowAllProducts=async(req,res)=>{
    try{
  const allProducts=await Product.find({},{
        name:true,
        price:true,
        stock:true,
        description:true,
        imageUrl:true
    })

        return res.status(200).json({
        success:true,
        message:" fetch product data",
       data:allProducts,
      })
    }
    catch(error){
return res.status(500).json({
        success:false,
        message:"canot fetch product  data",
        error:error.message,
      })
    }
  
}

//update product

exports.UpdateProducts=async(req,res)=>{
    try{
  const{name,productId,description,stock,price,imageUrl}=req.body;
  if(!name || !productId ||!description||!imageUrl||!stock ||!price){
     return res.status(400).json({
        success:false,
        message:'missing properties',
    });
  }

  const updatedproduct=await Product.findByIdAndUpdate(productId,{name,description,imageUrl,stock,price},{new:true});


return res.status(200).json({
    success:true,
    message:"product updated succesfully",
    updatedproduct,
});
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"product does not  updated succesfully",
      error: error.message,
        })
    }
  
}



//deleteproduct
exports.DeleteProduct=async(req,res)=>{
    try{
const{productId}=req.body;
if(!productId){
    return res.status(400).json({
        success:false,
        message:' there is error in product Id'
    })
}
const deleteproduct=await Product.findByIdAndDelete(productId);
   if (!deleteproduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
return res.status(200).json({
    success:true,
    message:'section deleted succesfully',
    deleteproduct
})
    }
    catch(error){
   return res.status(500).json({
        success:false,
        message:"unable to delete product please try again",
        error:error.message,
    })
    }
}