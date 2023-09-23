const express = require('express');
const mongoose = require('mongoose');
const {static} = require("express");
const { urlencoded } = require('express');
const Product = require('./models/plan.model');
const app = express();
const User = require('./db/plan.model')
const shopController = require('./public/shop')


// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Set up routes
app.get('/', shopController.getAllProducts);

// app.get('/login', (req, res) => {
//     res.render('login');
// });

// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// app.post('/signup', async(req, res) => {
//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     }

//     const checking = await user.findOne({ name: req.body.name })

//    try{
//     if (checking.name === req.body.name && checking.password===req.body.password) {
//         res.send("user details already exists")
//     }
//     else{
//         await user.insertMany([data])
//     }
//    }
//    catch{
//     res.send("wrong inputs")
//    }

// });
// Start the server
const port = 3030;
app.listen(port, () => console.log(`Server running on port ${port}`));