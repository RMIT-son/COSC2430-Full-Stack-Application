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

module.exports = {
    signup,
    signupview,
    shipper,
    order,
    status
}