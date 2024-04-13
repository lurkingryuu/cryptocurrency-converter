const winston = require('winston')
const { logging } = require('./../config/config')
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}
winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: logging.file,
        level: logging.level,
    }),
]

const logger = winston.createLogger({
    level: logging.level,
    levels,
    format,
    transports,
})

logger.info(`Logging initialized at ${logging.level} level.`)

module.exports = logger
