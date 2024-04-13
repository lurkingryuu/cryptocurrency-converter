const morgan = require('morgan')
const logger = require('../../utils/logger')

const shortFormat =
    ':remote-addr :method :url :status :res[content-length] - :response-time ms'
const longFormat =
    ':remote-addr :method :url :status :res[content-length] - :response-time ms - message: :response-time ms'

const shortFormatMiddleware = morgan(shortFormat, {
    stream: { write: (message) => logger.http(message.trim()) },
    skip: (req, res) => res.statusCode >= 400,
})

const longFormatMiddleware = morgan(longFormat, {
    stream: { write: (message) => logger.error(message.trim()) },
    skip: (req, res) => res.statusCode < 400,
})

module.exports = {
    shortFormatMiddleware,
    longFormatMiddleware,
}
