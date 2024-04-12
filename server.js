const express = require('express')
const cronjob = require('node-cron')
const bodyParser = require('body-parser')
const httpStatus = require('http-status')
const { cron, api } = require('./config/config')
const { updateCoins } = require('./src/services/crypto_update.service')
const { errorHandler, errorConvert } = require('./src/middleware/error')
const convert = require('./src/routes/convert.route')
const companies = require('./src/routes/companies.route')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/ping', (req, res) => {
    res.status(httpStatus.OK).send('Pong!')
})

app.use(api.prefix, convert)
app.use(api.prefix, companies)

app.use(errorConvert, errorHandler) // error handling middleware

if (cron.enabled) {
    cronjob.schedule(cron.pattern, async () => {
        await updateCoins()
    })
}

module.exports = app
