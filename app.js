const express = require("express");
const app = express();
const connectDB = require('./config/db'); // Adjust the path if necessary
//const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const authRoutes = require("./routes/authroutes");
const homeRoutes=require("./routes/homeRoutes")
const productRoutes=require("./routes/productRoutes")
const cartRoutes=require("./routes/cartRoutes")
const orderRoutes=require("./routes/orderRoutes")
const paymentRoutes=require("./routes/paymentRoutes")
const adminRoutes=require("./routes/adminRoutes")
const cookieParser = require("cookie-parser");
const path = require("path");

const { log } = require("console");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to the database
connectDB();


//-----------Routes----------------//
app.get("/", (req, res) => {
    res.redirect("/home/homepage");
  });

app.use("/home",homeRoutes)
app.use("/auth", authRoutes)
app.use("/products",productRoutes)
app.use("/cart",cartRoutes)
app.use("/orders",orderRoutes)
app.use("/payment",paymentRoutes)
app.use("/admin",adminRoutes)



app.listen(4000);
