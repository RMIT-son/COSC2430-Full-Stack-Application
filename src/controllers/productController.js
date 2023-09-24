const Product = require('../models/productModel'); // Import your Product model here

async function getProducts(req, res) {
    try {

        const minPrice = parseFloat(req.query.minPrice) || 0; // Get minimum price from query parameters, default to 0 if not provided
        const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER; // Get maximum price from query parameters, default to maximum safe integer if not provided
        const searchQuery = req.query.searchQuery || ''; // Get search query from query parameters
        // Create a filter object based on the provided criteria

        const filter = {
            price: { $gte: minPrice, $lte: maxPrice }, // Filter by price within the specified range
            name: { $regex: new RegExp(searchQuery, 'i') }, // Case-insensitive search by product name
        };
        const user = req.isAuthenticated() ? req.user : { userType: '' };

        // Fetch products that match the filter criteria
        const products = await Product.find(filter);

        // Render the page with the filtered products
        res.render('layout', { products: products , req : req, user : user, cartItems : cartItems});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getProducts
};
