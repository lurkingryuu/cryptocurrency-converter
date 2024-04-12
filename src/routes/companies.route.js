const router = require('express').Router()
const { getCompaniesList } = require('../controllers/companies.controller')
const { validateCompanies } = require('../middleware/validate')

router.post('/companies-holding', validateCompanies, getCompaniesList)

module.exports = router
