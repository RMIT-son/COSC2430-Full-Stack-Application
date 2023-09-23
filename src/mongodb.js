const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://web2023:mypassword@cluster1.k5yrevn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('Connection error', err);
});
const LogInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const collection = new mongoose.model("Collection1", LogInSchema)
module.exports=collection