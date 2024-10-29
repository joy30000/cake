const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const userModel = require("../models/user")
const cartModel = require("../models/cart")
const orderModel = require("../models/order")
const { getProductsCache, fetchProducts } = require('../productcache');

app.use(cookieParser())

//-----------PAYMENT CONTROLLER------------------------//
const paymentController = async (req, res) => {
    let total = req.query.total
    const ordersParam = req.query.orders;
    const userOrderArray = JSON.parse(decodeURIComponent(ordersParam));

    
    // Verify and decode the JWT
    let token = req.cookies.token;
    let userId = jwt.verify(token, 'SECRET', (err, decoded) => {
        if (err) {
            console.error(err);
            return;
        }
        // Access the user ID from the decoded token
        return decoded.userid;
    });
    let user = await userModel.findById(userId);
    let vpa='8527827424@ptsbi'
    let amount=total
    let name='joy'
    let transactionNote=user._id
    const upiLink = `upi://pay?pa=${vpa}&pn=${encodeURIComponent(name)}&mc=&tid=&tn=${encodeURIComponent(transactionNote)}&am=${amount}&cu=INR&url=`;
   res.render('payment.ejs',{upiLink ,total,ordersParam,userOrderArray})
}

module.exports = { paymentController }