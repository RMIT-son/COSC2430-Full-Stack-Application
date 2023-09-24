const express = require('express');
const mongoose = require('mongoose');
const {static} = require("express");
const { urlencoded } = require('express');
const productController = require('./src/controllers/productController');
const app = express();




// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Set up routes
app.get('/', productController.getIndexPage);




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