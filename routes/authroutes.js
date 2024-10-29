const express = require('express')
const app = express()
const router = express.Router();


const {signupController}=require('../controllers/authControllers')
const {signinController}=require('../controllers/authControllers') 
const {signoutController}=require('../controllers/authControllers') 
const {profileController}=require('../controllers/authControllers') 
const {profileUpdateController}=require('../controllers/authControllers') 

//-------SIGNUP PAGE || METHOD GET------------------------------//
router.get('/signup', async (req, res) => {
    res.render('signup.ejs');
})

//-------SIGNUP PAGE || METHOD POST------------------------------//
router.post('/signup',signupController) 

//-------SIGNIN PAGE || METHOD GET------------------------------//
router.get('/signin', async (req, res) => {
    res.render('signin.ejs');
})

//-------SIGNIN PAGE || METHOD POST------------------------------//
router.post('/signin',signinController)

//-------SIGNOUT || METHOD GET------------------------------//
router.get('/signout',signoutController)

//-------PROFILE PAGE || METHOD GET------------------------------//
router.get('/profile/:id',profileController)

//-------PROFILE UPDATE ROUTE || METHOD POST-----------------------------//
router.post('/profile-update',profileUpdateController)



module.exports = router;

