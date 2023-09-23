// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Dang Quoc Thang
// ID: s3977877
// Acknowledgement: Acknowledge the resources that you use here.
const mongoose = require('mongoose');

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