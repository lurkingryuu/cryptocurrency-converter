const express = require('express')
const mongoose = require('mongoose')
const cronjob = require('node-cron')
const bodyParser = require('body-parser')
const httpStatus = require('http-status')
const { uri } = require('./utils/db_uri')
const { port, host, cron, api } = require('./config/config')
const { updateCoins } = require('./src/services/crypto_update.service')
const { errorHandler, errorConvert } = require('./src/middleware/error')
const convert = require('./src/routes/convert.route')
const companies = require('./src/routes/companies.route')

mongoose.connect(uri()).catch((err) => {
    if (err) {
        console.error(err)
        console.error('Failed to connect to MongoDB')
        process.exit(1)
    }
})
const db = mongoose.connection

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

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
        console.log('Connected to MongoDB')
    })
})
