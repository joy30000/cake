const express = require('express')
const app = express()
const router = express.Router();

const {homepageController}=require("../controllers/homeController")

//-------HOME PAGE || METHOD GET------------------------------//
router.get('/homepage',homepageController) 



module.exports = router;

 