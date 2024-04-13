const axios = require('axios')
const { coingecko } = require('../../config/config')
const Coin = require('../models/coin.model')
const logger = require('../../utils/logger')

const options = {
    method: 'GET',
    url: `${coingecko.url}/coins/list`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CG-DEMO-API-KEY': coingecko.apiKey,
    },
}

const updateCoins = async () => {
    logger.info('Updating coins...')
    const start = new Date()

    try {
        const response = await axios.request(options)
        const coins = response.data
        const coins_in_db = await Coin.find({}).lean()
        let num_coins = coins.length
        let num_coins_db = await Coin.countDocuments()

        // Documents to update
        const coins_to_insert = []
        const coins_to_delete = []

        coins_in_db.forEach((coin) => {
            const found = coins.find((c) => c.id === coin.id)
            if (!found) {
                coins_to_delete.push(coin)
            }
        })

        coins.forEach((coin) => {
            const found = coins_in_db.find((c) => c.id === coin.id)
            if (!found) {
                coins_to_insert.push(coin)
            }
        })

        // Insert new coins
        if (coins_to_insert.length > 0) {
            await Coin.insertMany(coins_to_insert)
        }

        // Delete coins
        if (coins_to_delete.length > 0) {
            const coins_to_delete_ids = coins_to_delete.map((coin) => coin._id)
            await Coin.deleteMany({ _id: { $in: coins_to_delete_ids } })
        }

        let updated_coins = await Coin.countDocuments()

        const end = new Date()
        const duration_str = (end - start).toLocaleString()
        logger.info(
            `Synchronized ${num_coins} coins in the database (${num_coins_db} -> ${updated_coins}) [${duration_str} ms]`
        )
    } catch (error) {
        const end = new Date()
        const duration_str = (end - start).toLocaleString()
        logger.error(`Error updating coins [${duration_str} ms]`)
        logger.error(error)
    }
}

module.exports = {
    updateCoins,
}
