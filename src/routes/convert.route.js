const router = require('express').Router()
const { convertCurrency } = require('../controllers/convert.controller')
const { validateConvert } = require('../middleware/validate.middleware')

// Route to convert currency
router.post('/convert', validateConvert, convertCurrency)

// Export the router default
module.exports = router
