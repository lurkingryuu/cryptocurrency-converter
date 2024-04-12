const httpStatus = require('http-status')
const { convert } = require('../services/convert.service')
const catchAsync = require('../../utils/catchAsync')

const convertCurrency = catchAsync(async (req, res) => {
    const { fromCurrency, toCurrency, date } = req.body
    const result = await convert(fromCurrency, toCurrency, date)
    return res.status(httpStatus.OK).json(result)
})

module.exports = {
    convertCurrency,
}
