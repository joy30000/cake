const mongoose = require('mongoose');
const user=require('../models/user')

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    
    }
  ],
  
  status:{type: String, default:'Processing' },
  totalAmount: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);