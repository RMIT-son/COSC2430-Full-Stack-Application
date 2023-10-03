const {Product} = require('../models/productModel'); // Import your Product model here

async function getProducts(req, res) {
    try {

        const min = parseFloat(req.query.min) || 0;
        const max = parseFloat(req.query.max) || Number.MAX_SAFE_INTEGER;
        const search = req.query.search || '';

        // Filter products based on the query parameters
        const filter = {
            price: { $gte: min, $lte: max }, // Filter by price
            name: { $regex: new RegExp(search, 'i') }, // Search by name
        };
        const user = req.isAuthenticated() ? req.user : { userType: '' };

        // Query the database for products based on the filter
        const products = await Product.find(filter);

        // Render the products view along with the necessary data
        res.render('index', { products: products , req : req, user : user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

async function getProductDetails(req, res) {
    try {
        // Get the user from the request object
        const user = req.isAuthenticated() ? req.user : { _id: null };

        // Query the database for the product with the given id
        const product = await Product.findById(req.params.id);

        res.render('productDetail', { product: product, req: req, user: user });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getProducts,
    getProductDetails
};
