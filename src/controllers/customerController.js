const {User} = require('../models/userModel');
const bcrypt = require('bcrypt');
const {hashPassword} = require("../middleware/hashMiddleware");
const {Customer} = require("../models/userModel");


async function login(req, res) {
    const findUser = await User.findOne(User => User.name === req.body.name);
    if(!findUser) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, findUser.password)) {
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

async function signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;
    const filename = req.file.path;

    const findUser = await User.findOne({ username: username });
    if(!findUser) {
        const hashedPassword = await hashPassword(password);
        const newUser = new Customer({
            username: username,
            password: hashedPassword,
            userType: 'customer',
            profilePicturePath: filename,
            name: name,
            address: address
        })
        await newUser.save()
            .then(result =>{
                res.redirect('/login');
            }).catch(err => {
                console.error('User creation error:', err);
                throw new Error('Create user failed');
            })
    }
    else{
        throw new Error("User already exists")
    }
}

module.exports = {
    login,
    signup
}


