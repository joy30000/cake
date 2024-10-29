const { getProductsCache, fetchProducts } = require('../productcache');
const userModel = require("../models/user")
const user=require('../models/user')
const productModel = require("../models/product")
const orderModel = require("../models/order")

const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')


const express = require("express");
const app = express();
app.use(cookieParser())



//----------HOMEPAGE|| METHOD GET------------------//
const admin_dashboard_Controller = async (req, res) => {
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

    res.render('adminDashboard.ejs', { user, currentUrl });

}



//----------CREATE NEW PRODUCT PAGE|| METHOD POST------------------//
const admin_createNewProduct_Controller = async (req, res) => {
    let productpic = req.file.filename
    let { name, price, description, category } = req.body

    let findproduct = await productModel.findOne({ name: name })
    if (!findproduct) {
        let product = await productModel.create({
            name,
            price,
            description,
            productpic,
            category
        })
        await product.save()
        res.redirect('/products/list-products')
    } else {
        res.send('product with that name already exist')
    }
}


//----------EDIT/DELETE EXISTING PRODUCT PAGE || METHOD GET------------------//
const admin_deleteProduct_Controller = async (req, res) => {
    let productid = req.params.id
    let productId = productid.toString()


    const deletedItem = await productModel.findOneAndDelete({ _id: productid });
    res.redirect('/products/list-products')
}


//----------------------ADMIN MANAGE ORDER || METHOD GET------------------//
const admin_manageOrder_Controller = async (req, res) => {
    fetchProducts().then(async () => {
        let productsCache = getProductsCache();
        
        //res.send(orders)
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
  
    let orders = await orderModel.find().populate('userId')
    
    
        let currentUrl = req.originalUrl
        res.render('manageOrder.ejs', { productsCache, orders, currentUrl })
    })

}

//---------------------- ORDER STATUS || METHOD GET------------------//
const admin_orderStatus_Controller = async (req, res) => {

    let orderId = req.query.orderId
    let orderStatus = req.query.status
    let currentUrl = req.query.currentUrl

    const updateStaus = await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: orderStatus } });
    res.redirect(currentUrl)

}


//----------------------ADMIN EDIT PAGE || METHOD GET------------------//
const admin_editProduct_Controller = async (req, res) => {
    let productId = req.params.id

    fetchProducts().then(async () => {
        let productsCache = getProductsCache();
        const products = productsCache.find(product => product.id === productId);

        res.render('edit.ejs', { products, productId })
    })


}


//----------EDIT PRODUCT PAGE|| METHOD POST------------------//
const admin_updateProduct_Controller = async (req, res) => {
    let { name, price, description, category, productId } = req.body
    if (!req.file) {
        const Update = await productModel.updateOne(
            { _id: productId },
            { $set: { 'name': name, 'description': description, 'price': price, 'category': category } }
        );
    } else {
        let productpic = req.file.filename
        const Update = await productModel.updateOne(
            { _id: productId },
            { $set: { 'name': name, 'description': description, 'price': price, 'category': category, 'productpic': productpic } }
        );
    }
    res.redirect(`/products/displayProducts/${productId}`)
}




module.exports = { admin_dashboard_Controller, admin_createNewProduct_Controller, admin_deleteProduct_Controller, admin_manageOrder_Controller, admin_orderStatus_Controller, admin_editProduct_Controller, admin_updateProduct_Controller } 