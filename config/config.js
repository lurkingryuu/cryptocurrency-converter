require('dotenv').config()

module.exports = {
    // Database configuration
    // mongodb
    database: {
        // for local mongodb
        host: process.env.MONGODB_HOST || 'localhost',
        port: process.env.MONGODB_PORT || 27017,
        username: process.env.MONGODB_USERNAME || 'root',
        password: process.env.MONGODB_PASSWORD || 'root',
        db_name: process.env.MONGODB_DB_NAME || 'crypto',

        // for mongodb atlas or some other cloud mongodb
        url: process.env.MONGODB_URL,
    },

    // Server configuration
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',

    // API Prefix
    api: {
        prefix: '/api',
    },

    // CoinGecko API configuration
    coingecko: {
        url: 'https://api.coingecko.com/api/v3',
        apiKey: process.env.COINGECKO_API_KEY,
    },

    // Cron job configuration
    cron: {
        enabled: process.env.CRON_ENABLED || true,
        pattern: process.env.CRON_PATTERN || '0 * * * *', // Every hour
    },

    // Logging configuration
    logging: {
        level: 'info',
        file: 'logs/app.log',
    },

    // cors configuration
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
    },
}
