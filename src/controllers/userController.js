const {User, Customer} = require("../models/userModel");
const {hashPassword} = require("../middleware/hashMiddleware");
const passport = require("passport");

function login(req, res) {
    const user = req.isAuthenticated() ? req.user : { userType: '' };
    res.render('login', { req : req, user: user});
}

async function signup(req, res) {
    const user = req.isAuthenticated() ? req.user : { userType: '' };
    res.render('signup', { req : req, user: user});
}

function logout(req, res) {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
}

async function loginForm(req, res) {
    passport.authenticate('local', (err, user, info) => {
        if(!user) {
            return res.redirect('/login?error=invalidUsernamePassword');
        }
        req.session.returnTo = req.originalUrl;
        req.logIn(user, err => {
            if (err) {
                return (err);
            }
            if (user.userType === 'customer') {
                res.redirect('/');
            } else if (user.userType === 'vendor') {
                res.redirect('/');
            } else if (user.userType === 'shipper') {
                res.redirect('/');
            } else {
                res.redirect('/'); // Default redirect
            }
        });
    })(req, res);
}

async function profile(req, res) {
        if (req.isAuthenticated()) {
            const user = req.user || { userType: '' };
            res.render('profile', { user: user, req: req });
        } else {
            // If not authenticated, redirect to the login page
            res.redirect('/login');
        }
}

async function updateProfile(req, res) {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const userId = req.params.id;
        const imageUrl = req.file.path;

        await User.findByIdAndUpdate(userId, { profilePicturePath: imageUrl });

        return res.redirect('/profile');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    login,
    signup,
    logout,
    loginForm,
    profile,
    updateProfile
}