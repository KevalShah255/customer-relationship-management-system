const express = require('express')
const controller = require('../../controllers')
const router = express.Router()

// Company routes
router.get('/companies', controller.companyController.getCompanies)
router.get('/companies/:id', controller.companyController.getCompanyById)
router.post('/companies', controller.companyController.createCompany)

module.exports = router
