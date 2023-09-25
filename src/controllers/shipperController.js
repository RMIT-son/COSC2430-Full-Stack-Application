const {User, Shipper} = require("../models/userModel");
const {hashPassword} = require("../middleware/hashMiddleware");
const {Hub} = require("../models/hubModel");
const {Order} = require("../models/orderModel");

async function signupview(req, res) {
    try {
        const hubs = await Hub.find({});
        const error = req.query.error;
        res.render('shipper-signup', { error , hubs: hubs, req : req, user : req.isAuthenticated() ? req.user : { userType: '' }});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
async function signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const hub = req.body.distributionHub;
    const filename = req.file.path;

    const findUser = await User.findOne({ username: username });
    if(!findUser) {
        const hashedPassword = await hashPassword(password);
        const newUser = new Shipper({
            username: username,
            password: hashedPassword,
            userType: 'shipper',
            profilePicturePath: filename,
            assignedDistributionHub: hub
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

async function shipper(req, res) {
    const user = req.isAuthenticated() ? req.user : { userType: '' };

    try {
        const shipper = await Shipper.findById(user.id).populate('assignedDistributionHub');
        const hub = shipper.assignedDistributionHub;
        const orders = await Order.find({ hub: hub._id })
            .populate('hub')
            .populate('customer');
        res.render('shipper-order', { orders: orders, shipper: shipper, req : req , user : req.isAuthenticated() ? req.user : { userType: '' }}); // Change user to shipper here
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function order(req, res) {
    const order = await Order.findById(req.params.id)
        .populate('customer')
        .populate('products.product');
    res.render('order', {order : order, req : req, user : req.isAuthenticated() ? req.user : { userType: '' }});
}

async function status(req, res) {
    try {
        const orderId = req.params.id;
        const newStatus = req.body.status;
        const newOrder = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });

        if (!newOrder) {
            return res.status(404).send("Order not exist");
        }

        res.redirect('/shipper');
    } catch (e) {
        console.error(e);
        return res.status(500).send("An error has occurred");
    }
}
module.exports = {
    signup,
    signupview,
    shipper,
    order,
    status
}