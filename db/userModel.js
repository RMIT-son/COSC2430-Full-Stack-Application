// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Dang Quoc Thang
// ID: s3977877
// Acknowledgement: Acknowledge the resources that you use here.
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 15,
        match: /^[A-Za-z0-9]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
        // This validation is not perfect but it gives an idea. Regex can be updated for more accurate matches.
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
    },
    role: {
        type: String,
        enum: ['CUSTOMER', 'VENDOR', 'SHIPPER'],
        required: true
    },
    profilePicture: {
        type: String // Assuming you're storing the path to the image.
    },
    name: {
        type: String,
        minlength: 5,
        required: true
    },
    address: {
        type: String,
        minlength: 5,
        required: true
    },
    businessName: {
        type: String,
        minlength: 5,
        unique: true,  // This assumes that businessName is globally unique. If only unique among vendors, you'll need additional logic.
        sparse: true  // This ensures the unique index only considers documents where businessName exists.
    },
    distributionHub: {
        type: String, // This can be a reference to a DistributionHub collection if needed.
        minlength: 5
    }
});

// Middleware to hash the password before saving.
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;