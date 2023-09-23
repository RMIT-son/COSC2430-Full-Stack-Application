const mongoose = require("mongoose");

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://web2023:mypassword@cluster1.k5yrevn.mongodb.net/?retryWrites=true&w=majority'

// Connect to MongoDB Atlas
mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB Atlas", err));

module.exports = { mongoose };
  
