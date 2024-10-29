const express = require('express')
const app = express()
const router = express.Router();
const upload = require('../config/multer')

const {admin_dashboard_Controller}=require("../controllers/adminControllers")
const {admin_deleteProduct_Controller}=require("../controllers/adminControllers")
const {admin_editProduct_Controller}=require("../controllers/adminControllers")
const {admin_createNewProduct_Controller}=require("../controllers/adminControllers")
const {admin_manageOrder_Controller}=require("../controllers/adminControllers")
const {admin_orderStatus_Controller}=require("../controllers/adminControllers")
const {admin_updateProduct_Controller}=require("../controllers/adminControllers")
const { isLoggedIn } = require('../middlewares/authMidddleware');
const { isAdmin} = require('../middlewares/authMidddleware');

//-------ADMIN DASHBOARD PAGE || METHOD GET------------------------------//
router.get('/admin-dashboard',isLoggedIn, isAdmin, admin_dashboard_Controller) 


//-------ADMIN CREATE NEW PPRODUCT PAGE || METHOD GET------------------------------//
router.get('/create-new-product',isLoggedIn, isAdmin, async(req,res)=>{
    res.render('createNewProduct.ejs')
})

//-------ADMIN CREATE NEW PPRODUCT PAGE || METHOD POST------------------------------//
router.post('/create-new-product',isLoggedIn, upload.single('image'), admin_createNewProduct_Controller) 


//-------ADMIN DELETE PPRODUCT  || METHOD GET------------------------------//
router.get('/product-delete/:id', isLoggedIn, isAdmin, admin_deleteProduct_Controller) 


//-------ADMIN EDIT  PAGE || METHOD GET------------------------------//
router.get('/edit-product/:id', isLoggedIn, isAdmin, admin_editProduct_Controller) 

//-------ADMIN UPDATE PPRODUCT PAGE || METHOD POST------------------------------//
router.post('/update-product',isLoggedIn, upload.single('image'), admin_updateProduct_Controller) 


//-------ADMIN MANAGE ORDER  || METHOD GET------------------------------//
router.get('/manage-orders',isLoggedIn, isAdmin, admin_manageOrder_Controller) 


//-------ORDER STATUS  || METHOD GET------------------------------//
router.get('/order-status',isLoggedIn, isAdmin, admin_orderStatus_Controller) 





module.exports = router;
