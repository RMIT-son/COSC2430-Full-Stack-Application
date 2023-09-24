const customerController = require('../controllers/customerController');

app.get('/login', checkNotAuthenticated, (req, res) => {
    const user = req.isAuthenticated() 
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup/customer', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;
    const profilePicture = req.file.path;

    const findUser = await User.findOne({ username: username });
    if(!findUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new customerSchema({
            username: username, 
            password: hashedPassword, 
            userType: 'customer', 
            profilePicture: profilePicture, 
            name: name, 
            address: address
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
});


app.post('/signup/vendor', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const businessName = req.body.businessName;
    const businessAddress = req.body.businessAddress;
    const profilePicture = req.file.path;

    const findUser = await User.findOne({ username: username });
    if(!findUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new vendorSchema({
            username: username, 
            password: hashedPassword, 
            userType: 'vendor', 
            profilePicture: profilePicture, 
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
});

app.post('/signup/shipper', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hub = req.body.disstributionHub;
    const profilePicture = req.file.path;

    const findUser = await User.findOne({ username: username });
    if(!findUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new shipperSchema({
            username: username, 
            password: hashedPassword, 
            userType: 'shipper', 
            profilePicture: profilePicture, 
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
});
