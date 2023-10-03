// Seed data for the meal plans
const mongoose = require("mongoose");

const hubData = [
    {
        name: 'Ho Chi Minh',
        address: 'Ho Chi Minh Address',
    },
    {
        name: 'Hanoi',
        address: 'Hanoi Address',
    },
    {
        name: 'Danang',
        address: 'Danang Address',
    },
];

const Hub = require("./models/hubModel");

// Delete the collection if it exists
Hub.collection
    .drop()
    .then(() => {
        console.log("Current products are removed!");

        // Then insert data
        Hub.insertMany(hubData)
            .then(() => {
                console.log("New plans are saved!");
                process.exit();
            })
            .catch((error) => console.log(error.message));
    })
    .catch(() => console.log("Collection does not exist, so not"));
