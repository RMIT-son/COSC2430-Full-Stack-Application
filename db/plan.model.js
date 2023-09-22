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
// const User = require('./userModel');


// Define the schema for DistributionHubs
const distributionHubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes any whitespace
        minlength: 1
    },
    address: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    }
});

// Create the model based on the schema
const DistributionHub = mongoose.model('DistributionHub', distributionHubSchema);

// Export the model so you can use it in other parts of your app
module.exports = DistributionHub;



// Define the schema for Products
const productSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you've named your user model as 'User'
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Assuming price cannot be negative
    },
    image: {
        type: String,  // Storing image path. If you were storing binary, the type would be Buffer.
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    }
});

// Create the model based on the schema
const Product = mongoose.model('Product', productSchema);

// Export the model so you can use it in other parts of your app
module.exports = Product;



// Define the schema for ShoppingCart items
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Assuming your product model is named 'Product'
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

// Define the schema for ShoppingCarts
const shoppingCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you've named your user model as 'User'
        required: true,
        unique: true // One cart per user
    },
    items: [cartItemSchema]  // Array of cart items
});

// Create the model based on the schema
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

// Export the model so you can use it in other parts of your app
module.exports = ShoppingCart;



// Define the schema for Order items
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Assuming your product model is named 'Product'
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    priceAtOrder: {  // Captures price at the time of order in case product prices change later
        type: Number,
        required: true,
        min: 0
    }
});

// Define the schema for Orders
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you've named your user model as 'User'
        required: true
    },
    items: [orderItemSchema],  // Array of order items
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    orderStatus: {
        type: String,
        enum: ['ACTIVE', 'DELIVERED', 'CANCELED'],
        required: true,
        default: 'active'
    },
    distributionHub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DistributionHub', // Assuming your distribution hub model is named 'DistributionHub'
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

// Create the model based on the schema
const Order = mongoose.model('Order', orderSchema);

// Export the model so you can use it in other parts of your app
module.exports = Order;

