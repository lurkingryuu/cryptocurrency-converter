const mongoose = require('mongoose')
const { uri } = require('./utils/db_uri')
const { port, host } = require('./config/config')
const app = require('./server')
const { updateCoins } = require('./src/services/crypto_update.service')

let server

mongoose.connect(uri()).then(() => {
    console.log('Connected to MongoDB at', uri())
    server = app.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`)
    })
    updateCoins() // First time sync
})
const db = mongoose.connection

db.on('error', (err) => {
    console.error(err)
    console.error('Failed to connect to MongoDB')
    process.exit(1)
})

db.on('disconnected', () => {
    console.log('Lost MongoDB connection...')
    process.exit(1)
})

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason)
    process.exit(1)
})

process.on('SIGINT', () => {
    if (server) {
        server.close()
        console.log('Server closed')
    }
    db.close(() => {
        console.log('MongoDB connection closed')
        process.exit(0)
    })
})
