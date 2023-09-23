// Define the schema for ShoppingCart items
// const cartItemSchema = new mongoose.Schema({
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',  // Assuming your product model is named 'Product'
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: 1
//     }
// });

// Define the schema for ShoppingCarts
// const shoppingCartSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',  // Assuming you've named your user model as 'User'
//         required: true,
//         unique: true // One cart per user
//     },
//     items: [cartItemSchema]  // Array of cart items
// });

// // Create the model based on the schema
// const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

// // Export the model so you can use it in other parts of your app
// module.exports = ShoppingCart;


