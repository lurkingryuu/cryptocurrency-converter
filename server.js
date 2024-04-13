const express = require('express')
const cronjob = require('node-cron')
const bodyParser = require('body-parser')
const httpStatus = require('http-status')
const { cron, api, cors } = require('./config/config')
const { updateCoins } = require('./src/services/crypto_update.service')
const {
    errorHandler,
    errorConvert,
} = require('./src/middleware/error.middleware')
const convert = require('./src/routes/convert.route')
const companies = require('./src/routes/companies.route')
const {
    shortFormatMiddleware,
    longFormatMiddleware,
} = require('./src/middleware/morgan.middleware')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', cors.origin)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use(shortFormatMiddleware)
app.use(longFormatMiddleware)

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
