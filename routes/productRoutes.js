const express = require('express')
const app = express()
const router = express.Router();

const {productController}=require("../controllers/productController")
const {productSearchController}=require("../controllers/productController")
const {productFilterController}=require("../controllers/productController")
const {categoryController}=require("../controllers/productController")
const {displayproductsController}=require("../controllers/productController")






//-------PRODUCT PAGE || METHOD GET------------------------------//
router.get('/list-products',productController) 


//-------SEARCH PRODUCT PAGE || METHOD POST------------------------------//
router.post('/search',productSearchController) 

//------- PRODUCT FILTER PAGE || METHOD POST------------------------------//
router.post('/filter',productFilterController) 


//-------PRODUCT PAGE WITH CATEGORY || METHOD GET------------------------------//
router.get('/category/:category',categoryController) 

//-------PRODUCT DISPLAY PAGE || METHOD GET------------------------------//
router.get('/displayProducts/:id',displayproductsController)

                                         


module.exports = router;