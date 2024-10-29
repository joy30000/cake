const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const express = require("express");
const app = express();

app.use(cookieParser())


const isLoggedIn=(req, res, next)=> {
    const token = req.cookies.token;

    if (!token) return res.sendStatus(401);

    jwt.verify(token, "SECRET", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const isAdmin = (req, res, next) => {
    // Ensure the user is logged in first
    if (!req.user) {
        return res.sendStatus(401); // Unauthorized if user is not logged in
    }

    // Check if the user has admin privileges
    if (req.user.role !== 'admin') {
        return res.sendStatus(403); // Forbidden if user is not an admin
    }

    next(); // Proceed to the next middleware or route handler
};

module.exports = { isLoggedIn, isAdmin }