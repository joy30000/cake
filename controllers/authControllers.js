require("dotenv").config(); // Load environment variables from .env file
const userModel = require("../models/user")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const express = require("express");
const app = express();
app.use(cookieParser())
const bcrypt = require('bcrypt')


//----------SIGNUP || METHOD POST------------------//
const signupController = async (req, res) => {
  let { name, username, email, password, age, role, address, pincode, mobileno } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User Already Registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        name,
        email,
        password: hash,
        age,
        role,
        address,
        pincode,
        mobileno
      });


      res.redirect('/auth/signin');
    });
  });
};


//----------SIGNIN || METHOD POST------------------//
const signinController = async (req, res) => {
  let { email, password } = req.body
  let user = await userModel.findOne({ email })
  if (!user) return res.status(500).send('Something went wrong')
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const SECRET = process.env.SECRET;
      let token = jwt.sign({ email: email, userid: user._id, role: user.role },SECRET)
      res.cookie("token", token)
      res.status(200).redirect('/home/homepage')
    }
    else {
      res.redirect('/signin')
    }
  })
}


//----------SIGNOUT || METHOD get------------------//
const signoutController = async (req, res) => {

  res.cookie("token", "")
  res.redirect('/home/homepage')

}


//----------PROFILE PAGE || METHOD get------------------//
const profileController = async (req, res) => {
  let userid = req.params.id

  let user = await userModel.findOne({ _id: userid })


  res.render('profile.ejs', { user })

}


//----------PROFILE UPDATE ROUTE || METHOD POST------------------//
const profileUpdateController = async (req, res) => {
  let { name, username, email, age, address, pincode, mobileno, userid } = req.body

  const Update = await userModel.updateOne(
    { _id: userid },
    { $set: { 'name': name, 'username': username, 'email': email, 'age': age, 'address': address, 'pincode': pincode, 'mobileno': mobileno } }
  );

  res.redirect('/home/homepage')

}


module.exports = { signupController, signinController, signoutController, profileController, profileUpdateController };