// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Dang Quoc Thang
// ID: s3977877
// Acknowledgement: Acknowledge the resources that you use here.
const mongoose = require('mongoose');


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
