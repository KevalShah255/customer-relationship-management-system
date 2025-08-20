const express = require('express')
const controller = require('../../controllers')
const { validate } = require('../../middleware/validate')
const { createCompany, getCompanyById } = require('../../validations/company/company.validation')
const router = express.Router()

// Company routes
router.get('/companies', controller.companyController.getCompanies)
router.get('/companies/:id', validate(getCompanyById), controller.companyController.getCompanyById)
router.post('/companies', validate(createCompany), controller.companyController.createCompany)

module.exports = router
