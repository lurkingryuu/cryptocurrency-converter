const { coingecko } = require('../../config/config');
const axios = require('axios');
const Coin = require('../models/coin.model');
const httpStatus = require('http-status');
const customError = require('../../utils/customError');


const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CG-DEMO-API-KEY': coingecko.apiKey,
};

const base = 'usd';

const convert = async(from, to, date) => {
    // verify if the coin is in the database
    const coin1 = await Coin.findOne({ id: from });
    const coin2 = await Coin.findOne({ id: to });

    // if the coin is not in the database, return an error
    if (!coin1 && !coin2) {
        throw new customError(httpStatus.BAD_REQUEST, `Coins ${from} and ${to} not found`);
    }
    if (!coin1) {
        throw new customError(httpStatus.BAD_REQUEST, `Coin ${from} not found`);
    }
    if (!coin2) {
        throw new customError(httpStatus.BAD_REQUEST, `Coin ${to} not found`);
    }


    let response1;
    try {
        response1 = await axios.request({
            method: 'GET',
            url: `${coingecko.url}/coins/${coin1.id}/history?date=${date}&localization=false`,
            headers,
        });  
    } catch (error) {
        response1 = error.response;
        throw new customError(
            response1.status, 
            response1.data.status?.error_message || 
            response1.data.error.status?.error_message || 
            response1.statusText
        );
    }
    const rates1 = response1.data?.market_data?.current_price;
    if (rates1===undefined) {
        throw new customError(httpStatus.NOT_FOUND, `No data for ${coin1.symbol} on ${date}`);
    }

    if (rates1[coin2.symbol] !== undefined) {
        return rates1[coin2.symbol];
    }
    else {
        let response2;
        try {
            response2 = await axios.request({
                method: 'GET',
                url: `${coingecko.url}/coins/${coin2.id}/history?date=${date}&localization=false`,
                headers,
            });
        } catch (error) {
            response2 = error.response;
            throw new customError(
                response2.status, 
                response2.data.status?.error_message || 
                response2.data.error.status?.error_message || 
                response2.statusText
            );
        }
        const rates2 = response2.data?.market_data?.current_price;
        if (!rates2) {
            throw new customError(httpStatus.NOT_FOUND, `No data for ${coin2.symbol} on ${date}`);
        }

        if (rates2[base] === undefined || rates1[base] === undefined) {
            throw new customError(httpStatus.NOT_FOUND, `No data for base currency ${base} on ${date}`);
        }

        return rates1[base] / rates2[base];
    }

}

module.exports = {
    convert,
};