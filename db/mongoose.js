const mongoose = require("mongoose");
const express = require('express');
// const bcrypt = require('bcryptjs');
const app = express();
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb+srv://web2023:mypassword@cluster1.k5yrevn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('Connection error', err);
});

module.exports = mongoose;
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
  
