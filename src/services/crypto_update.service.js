const axios = require('axios');
const { coingecko } = require('../../config/config');
const Coin = require('../models/coin.model');

const options = {
    method: 'GET',
    url: `${coingecko.url}/coins/list`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CG-DEMO-API-KEY': coingecko.apiKey,
    },
};

async function updateCoins() {
    console.log('Updating coins...');
    const response = await axios.request(options);
    const coins = response.data;
    let num_coins = coins.length;
    let num_coins_db = await Coin.countDocuments();
    coins.forEach(async (coin) => {
        try {
            await Coin.findOneAndUpdate({ id: coin.id }, coin, { upsert: true })
        } catch (error) {
            console.error(error);
        }
    });

    // Remove coins that are not in the response
    await Coin.deleteMany({ id: { $nin: coins.map((coin) => coin.id) } });

    let updated_coins = await Coin.countDocuments();
    console.log(`Synchronized ${num_coins} coins in the database (${num_coins_db} -> ${updated_coins})`);
    
    return;
}

module.exports = {
    updateCoins,
};