const Product = require('../models/productModel'); // Import your Product model here

async function getIndexPage(req, res) {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getIndexPage
};
