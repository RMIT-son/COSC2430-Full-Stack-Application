const {Product} = require('../models/productModel');
const {Cart} = require('../models/cartModel');
const {Hub} = require('../models/hubModel');
const {Order} = require('../models/orderModel');

async function addToCart(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        const user = req.isAuthenticated() ? req.user : {userType: ''};
        if (user.userType !== "") {
            const newCartProduct = await new Cart({
                product: product,
                customer: user,
            });
            await newCartProduct.save();

            // Redirect to shopping cart instead of the homepage
            res.redirect('/cart');
        } else {
            res.redirect('/login'); // Redirect to login if not authenticated
        }
    } catch (e) {
        console.log(e);
    }
}


async function removeFromCart(req, res) {
    try {
        const user = req.isAuthenticated() ? req.user : {userType: ''};
        if (user.userType !== "") {
            await Cart.findOneAndDelete({ product: req.params.id, customer: user._id });
            res.redirect('/cart');
        } else {
            res.redirect('/login'); // Redirect to login if not authenticated
        }
    } catch (e) {
        console.log(e);
        return res.send("Error!");
    }
}

async function randomOrder(req, res){
    try {
        const user = req.isAuthenticated() ? req.user : { userType: '' };


        const cartItems = await Cart.find({ customer: user._id }).populate('product');
        let total = 0;
        cartItems.forEach(function(cartItem) {
            total = total + cartItem.product.price;
        })


        const productRefs = cartItems.map(cartItem => ({ product: cartItem.product._id }));

        const randomHub = await Hub.aggregate([{ $sample: { size: 1 } }]);


        const newOrder = new Order({
            products: productRefs,
            customer: user._id,
            total: total,
            hub: randomHub[0], // Assuming 'hubModel' returns a single hub document
        });


        await newOrder.save();


        await Cart.deleteMany({ customer: user._id });


        res.redirect('/cart');
    } catch (e) {
        console.error(e);
        return res.send("An error has occurred");
    }
}

async function seeCart(req, res) {
    try {
        const user = req.isAuthenticated() ? req.user : { userType: '' };
        const cartItems = await Cart.find({ customer: user._id }).populate('product');
        let total = 0;
        cartItems.forEach(function(cartItem) {
            total = total + cartItem.product.price;
        })

        res.render('shopping-cart', { user: user, cartItems: cartItems, total : total , req : req});
    } catch (e) {
        console.log(e);
        return res.send("An error has occurred");
    }
}
module.exports = {
    addToCart,
    removeFromCart,
    randomOrder,
    seeCart
}
