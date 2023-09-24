const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const productController = require('./src/controllers/productController');
const userController = require('./src/controllers/userController');
const shoppingCartController = require('./src/controllers/shoppingCartController');
const vendorController = require('./src/controllers/vendorController');
const shipperController = require('./src/controllers/shipperController');
const customerController = require('./src/controllers/customerController');
const app = express();
const multer = require('multer');
const { checkAuthenticated, checkNotAuthenticated, authenticateUser } = require('./src/middleware/authMiddleware');
const {User ,Customer, Shipper, Vendor} = require("./src/models/userModel");
const { Product } = require("./src/models/productModel");
const {Cart} = require("./src/models/cartModel");
const {hashPassword} = require("./src/middleware/hashMiddleware");

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('./public'));
app.use("/server-images", express.static("uploads"))


// Set up multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./server-images")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});
const upload = multer(
    {storage: storage},
    ).single("image");


app.use(session({
    secret: 'EJL5^(6jfXo}L`wBP4>0EVszuf[uBl:5',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000 * 24 // 24 hours cookie
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy   ( {
        usernameField: 'username',
        passwordField: 'password',
    },
    authenticateUser
));
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});


// Set up routes
app.get('/', productController.getProducts);

app.get('/product/:id', productController.getProductDetails);

app.get('/login', checkNotAuthenticated, userController.login);

app.get('/signup', checkNotAuthenticated, userController.signup);

app.get('/signup/customer', checkNotAuthenticated, (req, res) => {
    res.render('customer-signup');
});

app.get('/signup/vendor', checkNotAuthenticated, (req, res) => {
    res.render('vendor-signup');
});

app.get('/signup/shipper', checkNotAuthenticated, (req, res) => {
    res.render('shipper-signup');
});

app.post('/signup/customer', upload, customerController.signup);

app.post('/signup/vendor', upload, vendorController.signup)

app.post('/signup/shipper', upload, shipperController.signup)


app.post('/login', checkNotAuthenticated, async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.redirect('/login?error=invalidUsernamePassword');
        }
        req.session.returnTo = req.originalUrl;
        req.logIn(user, err => {
            if (err) {
                return next(err);
            }
            if (user.userType === 'customer') {
                res.redirect('/');
            } else if (user.userType === 'vendor') {
                res.redirect('/vendor');
            } else if (user.userType === 'shipper') {
                res.redirect('/shipper');
            } else {
                res.redirect('/'); // Default redirect
            }
        });
    })(req, res, next);
});


app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})
// TPD test

app.post('/product/:id', shoppingCartController.addToCart);
app.post('/remove/:id', shoppingCartController.removeFromCart);




// Static Pages
app.get('/contact', (req, res) =>
    res.render('contact')
);
app.get('/about', (req, res) =>
    res.render('about')
);

app.get('/test', (req, res) => {
    console.log(req.isAuthenticated()); // true or false

    console.log(req.user); // user object if authenticated

    res.send('Check logs');
})

// Start the server
const port = 3030;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));