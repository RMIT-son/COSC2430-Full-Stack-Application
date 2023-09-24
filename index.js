const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const {static} = require("express");
const { urlencoded } = require('express');
const productController = require('./src/controllers/productController');
const userController = require('./src/controllers/userController');
const shoppingCartController = require('./src/controllers/shoppingCartController');
const vendorController = require('./src/controllers/vendorController');
const shipperController = require('./src/controllers/shipperController');
const customerController = require('./src/controllers/customerController');
const app = express();
const multer = require('multer');

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('./public'));
app.use("/server-images", express.static("uploads"))


// Set up multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./server-images")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});
const upload = multer(
    {storage: storage},
    ).single("image");



// Static Pages
app.get('/contact', (req, res) =>
    res.render('contact')
);
app.get('/about', (req, res) =>
    res.render('about')
);

app.get('/test', (req, res) => {
    console.log(req.isAuthenticated()); // true or false

    console.log(req.user); // user object if authenticated

    res.send('Check logs');
})

// Start the server
const port = 3030;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));