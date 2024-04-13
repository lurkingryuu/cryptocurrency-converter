const httpStatus = require('http-status')
const customError = require('../../utils/customError')
const logger = require('../../utils/logger')

const errorConvert = (err, req, res, next) => {
    if (err instanceof customError) {
        return next(err)
    }
    return next(
        new customError(httpStatus.BAD_REQUEST, err.message, '', err.stack)
    )
}

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err
    if (!process.env.NODE_ENV === 'production') {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    }

    logger.error(err.message)
    logger.info(typeof err.message)

    const response = {
        error: {
            code: statusCode,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    }

    res.status(statusCode).send(response)
}

module.exports = {
    errorConvert,
    errorHandler,
}
