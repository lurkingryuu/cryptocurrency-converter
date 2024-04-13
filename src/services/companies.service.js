const httpStatus = require('http-status')
const { coingecko } = require('../../config/config')
const axios = require('axios')
const customError = require('../../utils/customError')
const Coin = require('../models/coin.model')

const getCompanies = async (crypto) => {
    const coin = await Coin.findOne({ id: crypto })
    if (!coin) {
        throw new customError(
            httpStatus.BAD_REQUEST,
            `Coin ${crypto} not found`
        )
    }

    const options = {
        method: 'GET',
        url: `${coingecko.url}/companies/public_treasury/${crypto}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CG-DEMO-API-KEY': coingecko.apiKey,
        },
    }
    try {
        const response = await axios.request(options)
        const companies = response.data.companies.map((company) => {
            return company.name
        })
        return { count: companies.length, companies }
    } catch (error) {
        const response = error.response
        throw new customError(
            response.status,
            response.data.status?.error_message ||
                response.data.error.status?.error_message ||
                response.statusText
        )
    }
}

module.exports = {
    getCompanies,
}
