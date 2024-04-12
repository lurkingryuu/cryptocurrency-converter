const validator = require('express-validator')
const httpStatus = require('http-status')
const luxon = require('luxon')
const customError = require('../../utils/customError')

const validateConvertRequest = [
    validator
        .body('fromCurrency')
        .notEmpty()
        .withMessage('fromCurrency is required')
        .isString()
        .withMessage('fromCurrency must be a string'),
    validator
        .body('toCurrency')
        .notEmpty()
        .withMessage('toCurrency is required')
        .isString()
        .withMessage('toCurrency must be a string'),
    validator
        .body('date')
        .notEmpty()
        .withMessage('date is required')
        .isString()
        .withMessage('date must be a string')
        .custom((value) => {
            if (!luxon.DateTime.fromFormat(value, 'dd-MM-yyyy').isValid) {
                throw new customError(
                    httpStatus.BAD_REQUEST,
                    'Invalid date format, specify DD-MM-YYYY and a valid date'
                )
            }
            return true
        }),
]

const validateConvert = async (req, res, next) => {
    const errors = validateConvertRequest.map((validation) =>
        validation.run(req)
    )
    await Promise.all(errors)
    const result = validator.validationResult(req)
    if (result.isEmpty()) {
        return next()
    }
    const errmsg = result
        .array()
        .map((err) => err.msg)
        .join(', ')
    return res.status(httpStatus.BAD_REQUEST).json({ error: errmsg })
}

const validateCompaniesRequest = [
    validator
        .body('currency')
        .notEmpty()
        .withMessage('currency is required')
        .isString()
        .withMessage('currency must be a string')
        /*
          validate if the currency is either BTC or ETH
          Currently, the API only supports these two currencies
          This validation can be extended / removed to support more currencies
        */
        .custom((value) => {
            const supportedCurrencies = ['bitcoin', 'ethereum']
            if (!supportedCurrencies.includes(value.toLowerCase())) {
                const errmsg = `currency must be either ${supportedCurrencies.join(
                    ' or '
                )}`

                throw new customError(httpStatus.BAD_REQUEST, errmsg)
            }
            return true
        }),
]

const validateCompanies = async (req, res, next) => {
    const errors = validateCompaniesRequest.map((validation) =>
        validation.run(req)
    )
    await Promise.all(errors)
    const result = validator.validationResult(req)
    if (result.isEmpty()) {
        return next()
    }
    const errmsg = result
        .array()
        .map((err) => err.msg)
        .join(', ')
    return res.status(httpStatus.BAD_REQUEST).json({ error: errmsg })
}

module.exports = {
    validateConvert,
    validateCompanies,
}
