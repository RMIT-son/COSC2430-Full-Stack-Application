const {User} = require('../models/userModel');
const bcrypt = require('bcrypt');

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        const user = req.user;
        if(user.userType === 'customer') {
            return res.redirect("/");
        } else if (user.userType === 'vendor') {
            return res.redirect("/vendor-products");
        } else if (user.userType === 'shipper') {
            return res.redirect("/shipper-order");
        }
    }
    next()
}

    // Function to authenticate users
async function authenticateUser(username, password, done) {
    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            // No user found with the provided username
            return done(null, false, { message: 'Incorrect username or password' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            // Password matches, return the user
            return done(null, user);
        } else {
            // Wrong password
            return done(null, false, { message: 'Incorrect username or password' });
        }
    } catch (error) {
        return done(error);
    }
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    authenticateUser
}

