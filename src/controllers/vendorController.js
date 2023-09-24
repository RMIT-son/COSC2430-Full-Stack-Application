const {User, Vendor} = require("../models/userModel");
const {hashPassword} = require("../middleware/hashMiddleware");

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

module.exports = {
    signup
}