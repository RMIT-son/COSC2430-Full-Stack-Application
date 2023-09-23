const express = require('express');
const mongoose = require('mongoose');
const {static} = require("express");
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Set up routes
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));