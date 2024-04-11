const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    id : {
        type: String,
        required: true
    },
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;