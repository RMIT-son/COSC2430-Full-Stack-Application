const { mongoose } = require('../services/mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        }
    }],

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    total: {
        type: Number,
        require: true,
    },

    hub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hub",
        
    },

    status: {
        type: String,
        default: "Active",
        enum: ["active", "delivered", "cancelled"],
        
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;