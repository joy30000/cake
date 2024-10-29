const mongoose=require('mongoose')


let cartSchema=mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ],
date:{
    type:Date,
    default:Date.now
},
})

module.exports=mongoose.model('cart',cartSchema)