const mongoose = require('mongoose')
const { uri } = require('./utils/db_uri')
const { port, host } = require('./config/config')
const app = require('./server')
const { updateCoins } = require('./src/services/crypto_update.service')
const logger = require('./utils/logger')

let server

mongoose.connect(uri()).then(() => {
    logger.info('Connected to MongoDB at', uri())
    server = app.listen(port, host, () => {
        logger.info(`Server is running on http://${host}:${port}`)
        updateCoins() // First time sync
    })
})
const db = mongoose.connection

db.on('error', (err) => {
    logger.error('Failed to connect to MongoDB with error:', err)
    process.exit(1)
})

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason)
    process.exit(1)
})

process.on('SIGINT', () => {
    if (server) {
        server.close()
        logger.info('Server closed')
    }
    db.close().then(() => {
        logger.info('MongoDB connection closed')
        process.exit(0)
    })
})
