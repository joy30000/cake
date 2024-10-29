const express = require('express')
const app = express()
const router = express.Router();


const {paymentController}=require('../controllers/paymentControllers')
const { isLoggedIn } = require('../middlewares/authMidddleware');


//-------SIGNUP PAGE || METHOD GET------------------------------//
router.get('/pay',isLoggedIn,paymentController )


module.exports = router;