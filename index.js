const express = require('express');
const mongoose = require('mongoose');
const {static} = require("express");
const { urlencoded } = require('express');
const Product = require('./src/models/productModel');
const app = express();




// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Set up routes

app.get('/', (req, res) => {
    Product.find()
        .then((products) => {
            res.render('index', { products: products });
        })
        .catch((error) => console.log(error.message));
});



// Start the server
const port = 3030;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));