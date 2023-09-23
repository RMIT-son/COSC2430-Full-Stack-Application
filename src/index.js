const express = require('express');
const app = express();
const path = require("path")
const mongoose = require('mongoose');
const {static} = require("express");
const hbs = require("hbs");
const collection=require("./mongodb");
app.use(express.json());

const templatePath = path.join(__dirname, "../templates")

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true })
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

// // Set up EJS as the view engine
app.set('view engine', "hbs");
app.set('views',templatePath);

app.use(express.urlencoded({ extended: false}));
// app.use(express.static('./public'));

// Set up routes
app.get("/",(req, res) => {
    res.render("login");
});
app.get("/signup",(req, res) => {
    res.render("signup");
});
app.post("/login", async (req, res)=>{
    try {
        const check=await collection.findOne({name:req.body.name})
        if (check.password===req.body.password) {
            res.render("home")
        }
        else{
            res.send("wrong password")
        }

        res.render("home")


        
    } catch {
        res.send("wrong details")        
    }

// await collection.insertMany([data])
// res.render("home")
})
// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));