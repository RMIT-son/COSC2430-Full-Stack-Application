const { mongoose } = require('../services/mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = {Product};