const {User, Vendor} = require("../models/userModel");
const {hashPassword} = require("../middleware/hashMiddleware");
const {Product} = require("../models/productModel");
const {validationResult} = require("express-validator");

async function signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const businessName = req.body.businessName;
    const businessAddress = req.body.businessAddress;
    const filename = req.file.path;

    const findUser = await User.findOne({ username: username });
    if(!findUser) {
        const hashedPassword = await hashPassword(password);
        const newUser = new Vendor({
            username: username,
            password: hashedPassword,
            userType: 'vendor',
            profilePicturePath: filename,
            businessName: businessName,
            businessAddress: businessAddress
        })
        await newUser.save()
            .then(result =>{
                res.redirect('/login');
            }).catch(err => {
                throw new Error ('Create user failed')
            })
    }
    else{
        throw new Error("User already exists")
    }
}

async function vendor(req, res) {
    try {
        const user = req.isAuthenticated() ? req.user : { userType: '' };
        const product = await Product.find({vendor : user._id})
        res.render('vendor-products', {products : product, req : req, user : user});
    } catch (e) {
        return res.send("A error has occurred")
    }
}

async function add(req, res) {
    const user = req.isAuthenticated() ? req.user : { userType: '' };
    res.render('vendor-add-products', { errors: [] , req : req, user : user});
}

async function addProduct(req, res) {
        const errors = validationResult(req).array();
        try {
            const name = req.body.name;
            const price = req.body.price;
            const desc = req.body.desc;
            const productImage = req.file.path;

            const vendorId = req.isAuthenticated() ? req.user : { userType: '' }._id;

            if (errors.length > 0) {
                return res.render('vendor-add-products', { errors, user :  req.isAuthenticated() ? req.user : { userType: '' } , req : req});
            }

            const newProduct = new Product({
                name: name,
                price: price,
                desc: desc,
                productImage: productImage,
                vendor: vendorId, // Set the vendor ID for the product
            });

            await newProduct.save();
            res.redirect('/vendor');
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while adding the product');
        }
}

module.exports = {
    signup,
    addProduct,
    vendor,
    add
}