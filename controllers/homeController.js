const { getProductsCache, fetchProducts } = require('../productcache');
const userModel = require("../models/user")

const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const express = require("express");
const app = express();
app.use(cookieParser())



//----------HOMEPAGE|| METHOD GET------------------//
const homepageController = async (req, res) => {

    // Fetch products initially (if needed) or just access the cache
    fetchProducts().then(async () => {
        let productsCache = getProductsCache();// This should now contain the fetched products
        let products = productsCache
        let currentUrl = req.originalUrl

        //to get token
        let token = req.cookies.token;
        let user = ''
        if (token) {
            // Verify and decode the JWT
            let userId = jwt.verify(token, 'SECRET', (err, decoded) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // Access the user ID from the decoded token
                return decoded.userid;
            });
            user = await userModel.findById(userId);
        }
        res.render('index.ejs', { products, user, currentUrl });
    });
}

module.exports = { homepageController }