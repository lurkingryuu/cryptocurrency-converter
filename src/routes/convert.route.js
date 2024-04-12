const router = require('express').Router()
const { convertCurrency } = require('../controllers/convert.controller')
const { validateConvert } = require('../middleware/validate')

// Route to convert currency
router.post('/convert', validateConvert, convertCurrency)

// Export the router default
module.exports = router
