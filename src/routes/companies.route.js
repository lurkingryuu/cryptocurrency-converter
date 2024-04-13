const router = require('express').Router()
const { getCompaniesList } = require('../controllers/companies.controller')
const { validateCompanies } = require('../middleware/validate.middleware')

router.post('/companies-holding', validateCompanies, getCompaniesList)

module.exports = router
