const { mongoose } = require('../services/mongoose');

const hubSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    address: {
        type: String,
        require: true,
        unique: true,
    },
});

const Hub = mongoose.model('Hub', hubSchema);
module.exports = Hub;