const httpStatus = require('http-status')
const { getCompanies } = require('../services/companies.service')
const catchAsync = require('../../utils/catchAsync')

const getCompaniesList = catchAsync(async (req, res) => {
    const { currency } = req.body
    const result = await getCompanies(currency)
    return res.status(httpStatus.OK).json(result)
})

module.exports = {
    getCompaniesList,
}
