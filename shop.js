const mongoose = require('mongoose');
const Product = require('./db/plan.model');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('index', {products:products});
        })
        .catch(err => console.log(err));
};

