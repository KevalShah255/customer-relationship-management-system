const services = require('../../services')
const { sendSuccess } = require('../../middleware/apiError')
const { apiHandler } = require('../../middleware/globalErrorHandler')

exports.getContacts = apiHandler(async (req, res) => {
  const result = await services.contactService.getContacts(req.query)
  sendSuccess({ res, ...result })
})

exports.getContactById = apiHandler(async (req, res) => {
  const result = await services.contactService.getContactById(req.params.id)
  sendSuccess({ res, ...result })
})

exports.createContact = apiHandler(async (req, res) => {
  const result = await services.contactService.createContact(req.body)
  sendSuccess({ res, ...result })
})
