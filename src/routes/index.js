const express = require('express')
const router = express.Router()
const companyRoutes = require('./company/company.route')
const contactRoutes = require('./contact/contact.route')

router.use(companyRoutes)
router.use(contactRoutes)

module.exports = router
