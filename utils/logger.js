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

const formatConsole = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const formatFile = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const options = {
    file: {
        level: logging.level,
        filename: logging.file,
        handleExceptions: true,
        format: formatFile,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        format: formatConsole,
    },
}

const transports = [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.file),
]

const logger = winston.createLogger({
    levels,
    transports,
    exitOnError: false,
})

module.exports = logger
