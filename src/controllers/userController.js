const {User, Customer} = require("../models/userModel");
const {hashPassword} = require("../middleware/hashMiddleware");

function login(req, res) {
    const user = req.isAuthenticated() ? req.user : { userType: '' };
    res.render('login', { req : req, user: user});
}

async function signup(req, res) {
    const user = req.isAuthenticated() ? req.user : { userType: '' };
    res.render('signup', { req : req, user: user});
}

module.exports = {
    login,
    signup
}