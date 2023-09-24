// Seed data for the meal plans
const mongoose = require("mongoose");

const objectId1 = new mongoose.Types.ObjectId();
const objectId2 = new mongoose.Types.ObjectId();
const objectId3 = new mongoose.Types.ObjectId();
const objectId4 = new mongoose.Types.ObjectId();
const objectId5 = new mongoose.Types.ObjectId();
const objectId6 = new mongoose.Types.ObjectId();

const products = [{
    name: "Product 1",
    price: 19.99,
    desc: "Description for Product 1",
    productImage: "https://source.unsplash.com/800x600/?lemonade",
    vendor: objectId1, // Replace with a valid vendor ID
},
    {
        name: "Product 2",
        price: 29.99,
        desc: "Description for Product 2",
        productImage: "https://source.unsplash.com/800x600/?fish",
        vendor: objectId2, // Replace with another valid vendor ID
    },
    {
        name: "Product 3",
        price: 14.99,
        desc: "Description for Product 3",
        productImage: "https://source.unsplash.com/800x600/?orange",
        vendor: objectId3, // Replace with a valid vendor ID
    },
    {
        name: "Product 4",
        price: 39.99,
        desc: "Description for Product 4",
        productImage: "https://source.unsplash.com/800x600/?chicken",
        vendor: objectId4, // Replace with a valid vendor ID
    },
    {
        name: "Product 5",
        price: 9.99,
        desc: "Description for Product 5",
        productImage: "https://source.unsplash.com/800x600/?butter",
        vendor: objectId5, // Replace with a valid vendor ID
    },
    {
        name: "Product 6",
        price: 49.99,
        desc: "Description for Product 6",
        productImage: "https://source.unsplash.com/800x600/?steak",
        vendor: objectId6, // Replace with another valid vendor ID
    }
];

const Product = require("./models/productModel");

// Delete the collection if it exists
Product.collection
    .drop()
    .then(() => {
        console.log("Current products are removed!");

        // Then insert data
        Product.insertMany(products)
            .then(() => {
                console.log("New plans are saved!");
                process.exit();
            })
            .catch((error) => console.log(error.message));
    })
    .catch(() => console.log("Collection does not exist, so not"));
