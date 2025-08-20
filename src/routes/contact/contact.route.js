const express = require('express')
const controller = require('../../controllers')
const router = express.Router()

// Contact routes
router.get('/contacts', controller.contactController.getContacts)
router.get('/contacts/:id', controller.contactController.getContactById)

router.post('/contacts', controller.contactController.createContact)

module.exports = router
