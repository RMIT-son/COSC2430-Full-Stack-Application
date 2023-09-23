const mongoose = require("mongoose");
const express = require('express');

mongoose.connect('mongodb+srv://web2023:mypassword@cluster1.k5yrevn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('Connection error', err);
});

module.exports = {mongoose};
  
