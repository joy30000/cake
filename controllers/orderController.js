const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const userModel = require("../models/user")
const cartModel = require("../models/cart")
const orderModel = require("../models/order")
const { getProductsCache, fetchProducts } = require('../productcache');

app.use(cookieParser())

//-----------ORDER CONTROLLER------------------------//
const orderController = async (req, res) => {
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

    let order = await orderModel.create({
        userId: userId,
        items: userOrderArray,
        totalAmount: total



    })


    let result = await userModel.updateOne(
        { _id: userId }, // Match the user by userId
        { $set: { cart: [] } } // Remove itemId from the cart array
    );

    let cart = await cartModel.findOneAndDelete({ user: userId })

    userOrderArray.length = 0

    res.redirect('/home/homepage')

}


//----------------ORDER PAGE CONTROLLER--------------------------//
const orderPageController = async (req, res) => {

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

    let orderArray = []
    orderArray.length = 0

    const itemsArray = [];



    fetchProducts().then(async () => {
        let productsCache = getProductsCache();// This should now contain the fetched products
        let products = productsCache

        let order = await orderModel.find({ userId: userId });
       


        if (order.length != 0) {
            res.render('order.ejs', { productsCache, order, orderModel })
        } else {
            res.render('order.ejs', { productsCache, order, orderModel })

        }
    })

}

module.exports = { orderController, orderPageController }