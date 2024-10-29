const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const userModel = require("../models/user")
const cartModel = require("../models/cart")
const { getProductsCache, fetchProducts } = require('../productcache');

app.use(cookieParser())


//--------------------------------------ADD TO CART || METHOD GET----------------------------------------//
const addToCartController = async (req, res) => {
    const token = req.cookies.token;
    let productId = req.params.productId

    // Verify and decode the JWT
    let userId = jwt.verify(token, 'SECRET', (err, decoded) => {
        if (err) {
            console.error(err);
            return;
        }
        // Access the user ID from the decoded token
        return decoded.userid;
    });

    let quantity = 1
    let user = await userModel.findById(userId);

    if (user.cart.length === 0) {
        let cart = await cartModel.create({
            user: userId,
            items: [{ productId: productId, quanity: quantity }]
        })
        user.cart.push(cart._id)
        await user.save()

    } else {
        let usercart = user.cart.toString()

        let findcart = await cartModel.findOne({ _id: usercart });
        findcart.items.push({ productId, quantity })
        await findcart.save()
    }
    res.redirect(`/products/displayProducts/${productId}`)
}



//------------------------------CART PAGE || METHOD GET----------------------------------------//
const cartPageController = async (req, res) => {
    let ad = []
    let userOrderArray = []
    let bool = false
    let currentUrl = req.originalUrl

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
    let iscart = 'true'
    if (user.cart.length == 0) {

        iscart = 'false'

        res.render('usercart.ejs', { currentUrl, iscart })
    }
    else {


        fetchProducts().then(async () => {

            let productsCache = getProductsCache();// This should now contain the fetched products
            let usercart = user.cart.toString()
            iscart = 'true'
            let findcart = await cartModel.findOne({ _id: usercart });
            let cartarray = findcart.items;
            let c = cartarray.map(item => item.productId);

            c.reverse().forEach(function (cartitem) {
                let cartitems = cartitem.toString()
                let a = productsCache.find(product => product.id === cartitems);
                ad.push(a)
            })

            let productPriceArray = []

            res.render('usercart.ejs', { ad, cartarray, productPriceArray, userOrderArray, currentUrl, iscart })

        })
    }
}





//------------------------------CART QUANTITY || METHOD GET----------------------------------------//
const cartQuantityController = async (req, res) => {

    const productId = req.query.productId;
    let quantity = req.query.quantity;
    let action = req.query.action
    let currentUrl = req.query.currentUrl

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

    //convert quantity from string to number
    let newQuantity = Number(quantity)

    if (action == 'addition') {
        //Update the quantity of the product in the items array +1
        const result = await cartModel.updateOne(
            { user: userId, 'items.productId': productId },
            { $set: { 'items.$.quantity': newQuantity += 1 } }
        );
    }
    else if (action == 'subtraction') {
        //Update the quantity of the product in the items array -1
        if (quantity != '1') {
            const result = await cartModel.updateOne(
                { user: userId, 'items.productId': productId },
                { $set: { 'items.$.quantity': newQuantity -= 1 } }
            );

        } else {


            try {
                const result = await cartModel.findOneAndUpdate(
                    { user: userId },
                    { $pull: { items: { productId: productId } } }
                );

                //console.log('Item removed:', result);
            } catch (error) {
                console.error('Error removing item:', error);
            }
            let usercart = user.cart.toString()
            let findcart = await cartModel.findOne({ _id: usercart });
            let cartarray = findcart.items;


            if (cartarray.length == 0) {
                let result = await userModel.updateOne(
                    { _id: userId }, // Match the user by userId
                    { $set: { cart: [] } } // Remove itemId from the cart array
                );

                let cart = await cartModel.findOneAndDelete({ user: userId })
            }

        }
    }
    res.redirect(currentUrl)

}

module.exports = { addToCartController, cartPageController, cartQuantityController }