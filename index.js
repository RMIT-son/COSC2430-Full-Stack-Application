const express = require('express');
const session = require('express-session');
const passport = require('passport');
const {static} = require("express");
const { urlencoded } = require('express');
const productController = require('./src/controllers/productController');
const app = express();
const multer = require('multer');


// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


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

// Set up routes
// Product routes
app.get('/', productController.getProducts);


// Static Pages
app.get('/contact', (req, res) =>
    res.render('contact')
);
app.get('/about', (req, res) =>
    res.render('about')
);

// Start the server
const port = 3030;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));