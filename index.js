const express = require('express');
const {body} = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const productController = require('./src/controllers/productController');
const userController = require('./src/controllers/userController');
const shoppingCartController = require('./src/controllers/shoppingCartController');
const vendorController = require('./src/controllers/vendorController');
const shipperController = require('./src/controllers/shipperController');
const customerController = require('./src/controllers/customerController');
const app = express();
const multer = require('multer');
const { checkAuthenticated, checkNotAuthenticated, authenticateUser } = require('./src/middleware/authMiddleware');
const {User} = require("./src/models/userModel");


// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('./public'));
app.use("./server-images", express.static("./server-images"))


// Set up multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./server-images/")
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

app.get('/vendor', checkAuthenticated, vendorController.vendor);
app.get('/add', checkAuthenticated, vendorController.add);
app.post(
    '/addproduct', checkAuthenticated,
    upload,
    [
        body('name')
            .isString()
            .isLength({ min: 10, max: 20 })
            .withMessage('Product name must be a text between 10 and 20 characters'),

        body('price')
            .isNumeric()
            .isFloat({ min: 0 })
            .withMessage('Price must be a positive number'),

        body('desc')
            .isString()
            .isLength({ max: 500 })
            .withMessage('Description is at most 500 characters'),
    ],
       vendorController.addProduct)
app.get('/shipper', checkAuthenticated, shipperController.shipper);
app.get('/order/:id', checkAuthenticated, shipperController.order);
app.post('/status/:id', checkAuthenticated, shipperController.status);


app.post('/remove/:id', shoppingCartController.removeFromCart);

app.get('/signup/shipper', checkNotAuthenticated, shipperController.signupview);

app.get("/profile", checkAuthenticated, userController.profile);
app.post('/profile/:id',checkAuthenticated, upload, userController.updateProfile);

app.get('/cart', checkAuthenticated, shoppingCartController.seeCart);
app.post('/signup/customer', upload, customerController.signup);

app.post('/signup/vendor', upload, vendorController.signup)

app.post('/signup/shipper', upload, shipperController.signup)

app.post('/login', checkNotAuthenticated, userController.loginForm);

app.delete("/logout", userController.logout);
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

app.get('/copyright', (req, res) => {
    res.render('copyright')
});

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/privacy', (req, res) => {
    res.render('privacy-policy')
})

app.get('/terms', (req, res) => {
    res.render('terms-and-conditions')
})

app.get('/services', (req, res) => {
    res.render('services')
})
// Start the server
const port = 3030;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));