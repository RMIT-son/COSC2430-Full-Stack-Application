const User = require('./src/models/userModel');
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
    const authenticateUsers = async (username, password, done) => {
        const username = req.body.username;

        const findUser = await User.findOne({ username: username });
        if(!findUser) {
            return done(null, false, {message: "No user found with that username"})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done (null, false, {message: "Password Incorrect"})
            }
        } catch (error) {
            console.log(error);
            return done(error)
        }
    }