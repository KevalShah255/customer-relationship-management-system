const express = require('express')
const controller = require('../../controllers')
const { validate } = require('../../middleware/validate')
const { createContact, getContactById } = require('../../validations/contact/contact.validation')
const router = express.Router()

// Contact routes
router.get('/contacts', controller.contactController.getContacts)
router.get('/contacts/:id', validate(getContactById), controller.contactController.getContactById)

router.post('/contacts', validate(createContact), controller.contactController.createContact)

module.exports = router
