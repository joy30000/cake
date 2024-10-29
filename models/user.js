const mongoose = require("mongoose");


let userSchema=mongoose.Schema({
    username:String,
    name:String,
    age:Number,
    email:String,
    password:String,
    role:String,
    address:String,
    pincode:Number,
    mobileno:Number,
    profilepic:{
        type:String,
        default:'default.png'
    },
    cart: [{
      type:mongoose.Schema.Types.ObjectId,ref:"cart"
      }],
    })
    
    module.exports=mongoose.model('user',userSchema)