const { mongoose } = require('../services/mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ['customer', 'vendor', 'shipper'],
    },
    profilePicturePath: {
        type: String,
        required: true,
    },
}, { discriminatorKey: 'userType' });

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const vendorSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
        unique: true,
    },
    businessAddress: {
        type: String,
        required: true,
        unique: true,
    },
});

const shipperSchema = new mongoose.Schema({
    assignedDistributionHub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hub",
        required: true,
    },
});

const User = mongoose.model('User', userSchema);
const Customer = User.discriminator('customer', customerSchema);
const Vendor = User.discriminator('vendor', vendorSchema);
const Shipper = User.discriminator('shipper', shipperSchema);

module.exports = { User, Customer, Vendor, Shipper};