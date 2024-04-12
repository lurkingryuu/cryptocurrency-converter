const router = require('express').Router();
const { convertCurrency } = require('../controllers/convert.controller');
const { validate } = require('../middleware/validate_convert');

// Route to convert currency
router.post('/convert', validate, convertCurrency);

// Export the router default
module.exports = router;

