
const mongoose = require('mongoose');


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