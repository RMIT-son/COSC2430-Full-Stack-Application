const mongoose = require('mongoose');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');


exports.loginUser = async(req, res) => {
    const findUser = await User.findOne(User => User.name === req.body.name);
    if(!findUser) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        }
        else{
            res.send('Not Allowed')
        }
    }
    catch{
        res.status(500).send()
    }
}

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('index', {products:products});
        })
        .catch(err => console.log(err));
};
