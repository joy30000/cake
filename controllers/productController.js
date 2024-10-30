const { getProductsCache, fetchProducts } = require('../productcache');
const cartModel = require("../models/cart")
const userModel = require("../models/user")



const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const express = require("express");
const app = express();
app.use(cookieParser())



//------------------PRODUCT PAGE-------------//
const productController = async (req, res) => {

    fetchProducts().then(async () => {
        let currentUrl = req.query.currentUrl

        //to get token
        let token = req.cookies.token;
        let userId
        if (token) {
            // Verify and decode the JWT
            userId = jwt.verify(token, 'SECRET', (err, decoded) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // Access the user ID from the decoded token
                return decoded.userid;
            });

        }
        let user = await userModel.findById(userId)
        let productsCache = getProductsCache();// This should now contain the fetched products
        const products = productsCache
        let filter = 'false'
        res.render('products.ejs', { products, user, filter, currentUrl });
    })
}

//------------------PRODUCT SEARCH || METHOD POST-------------//
const productSearchController = async (req, res) => {
    let { search } = req.body


    fetchProducts().then(async () => {
        //to get token
        let token = req.cookies.token;
        let userId
        if (token) {
            // Verify and decode the JWT
            userId = jwt.verify(token, 'SECRET', (err, decoded) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // Access the user ID from the decoded token
                return decoded.userid;
            });

        }
        let user = await userModel.findById(userId)
        try {

            let productsCache = getProductsCache();// This should now contain the fetched products
            // Filter products based on the query
            const products = productsCache.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase())

            )

            filter = 'true'
            res.render('products.ejs', { products, user, filter, search });



        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    });
}

//--------------------PRODUCT FILTER || METHOD POST------------------------//
const productFilterController = async (req, res) => {
    let { search, category, maxPrice } = req.body


    fetchProducts().then(async () => {
        //to get token
        let token = req.cookies.token;
        let userId
        if (token) {
            // Verify and decode the JWT
            userId = jwt.verify(token, 'SECRET', (err, decoded) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // Access the user ID from the decoded token
                return decoded.userid;
            });

        }
        let user = await userModel.findById(userId)
        try {

            let productsCache = getProductsCache();// This should now contain the fetched products
            // Filter products based on the query
            const resultproducts = productsCache.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase())


            )


            const products = resultproducts.filter(product =>
                product.category == category &&
                Number(product.price) < maxPrice



            )

            let filter = 'true'
            res.render('products.ejs', { products, user, filter, search });



        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    });
}


//------------------PRODUCT WITH CATEGORY PAGE-------------//
const categoryController = async (req, res) => {

    fetchProducts().then(async () => {
        let productsCache = getProductsCache();// This should now contain the fetched products

        //to get token
        let token = req.cookies.token;
        let userId
        if (token) {
            // Verify and decode the JWT
            userId = jwt.verify(token, 'SECRET', (err, decoded) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // Access the user ID from the decoded token
                return decoded.userid;
            });

        }
        let filter = 'false'
        let user = await userModel.findById(userId)
        const category = req.params.category
        const products = productsCache.filter(product => product.category === category);
        let currentUrl = req.originalUrl
        res.render('products.ejs', { products, user, filter });
    })
}


//------------------DISPLAY PRODUCT PAGE-------------//
const displayproductsController = async (req, res) => {

    fetchProducts().then(async () => {
        let productsCache = getProductsCache();// This should now contain the fetched products

        let productid = req.params.id


        const products = productsCache.find(product => product.id === productid);

        const category = products.category
        const productcategory = productsCache.filter(product => product.category === category);
        let i = true

        //to get token
        let token = req.cookies.token;
        let userId
        if (token) {
            // Verify and decode the JWT
            userId = jwt.verify(token, 'SECRET', (err, decoded) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // Access the user ID from the decoded token
                return decoded.userid;
            });

        }

        let cart = await cartModel.findOne({ user: userId })

        let productQuantity = ''
        let iscartitem = ''
        if (cart) {
            cart.items.forEach(function (item) {


                if (productid == item.productId.toString()) {
                    productQuantity = item.quantity
                    iscartitem = true

                } else {
                    iscartitem = false


                }

            })
        }

        let currentUrl = req.originalUrl
        res.render('displayproducts.ejs', { products, productcategory, i, iscartitem, productQuantity, productid, currentUrl })


    })
}


module.exports = { productController, productSearchController, productFilterController, categoryController, displayproductsController }