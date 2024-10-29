const mongoose=require('mongoose')

let productSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    date:{
        type:Date,
        default:Date.now
    },
name:String,
description:String,
category:String,
price:String,
productpic:{
    type:String,
    default:'default.png'
}, 
 createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model('product',productSchema)