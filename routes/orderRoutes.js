const express = require('express')
const app = express()
const router = express.Router();


const {orderController}=require("../controllers/orderController")
const {orderPageController}=require("../controllers/orderController")
const { isLoggedIn } = require('../middlewares/authMidddleware');
 

//-------ORDER DISPLAY PAGE || METHOD GET------------------------------//
router.get('/user-orders',isLoggedIn,orderController)  
router.get('/user-orders-page',isLoggedIn,orderPageController)  



module.exports = router;