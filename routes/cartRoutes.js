const express = require('express')
const app = express()
const router = express.Router();


const {addToCartController}=require("../controllers/cartController")
const {cartPageController}=require("../controllers/cartController")
const {cartQuantityController}=require("../controllers/cartController")
const { isLoggedIn } = require('../middlewares/authMidddleware');
 

//-------PRODUCT DISPLAY PAGE ADD TO CART || METHOD GET------------------------------//
router.get('/add_to_cart/:productId',isLoggedIn,addToCartController)  

//-------CART PAGE || METHOD GET------------------------------//
router.get('/cart_page',isLoggedIn,cartPageController) 

//-------CART QUANTITY || METHOD GET------------------------------//
router.get('/cart-quantity',isLoggedIn,cartQuantityController) 


module.exports = router;