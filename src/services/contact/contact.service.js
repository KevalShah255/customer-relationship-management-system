const { sendAPIerror } = require('../../middleware/apiError')
const { contact } = require('../../models')
const { responseMessage } = require('../../utils/responseMessage')
const statusCode = require('../../utils/statusCode')
const { getPagination, generatePaginatedResponse } = require('../../helper/common')

exports.getContacts = async (queryParams) => {
  const paginationOptions = getPagination(queryParams)
  const page = parseInt(queryParams.page) || 1

  const contactData = await contact.findAndCountAll({ ...paginationOptions })
  return {
    message: responseMessage('success', 'Fetched', 'Contacts'),
    data: generatePaginatedResponse(contactData, paginationOptions, page),
  }
}

exports.getContactById = async (companyId) => {
  const contactData = await contact.findOne({
    where: { id: companyId },
  })
  if (!contactData) {
    return sendAPIerror(statusCode.NOTFOUND, responseMessage('not_found', 'Contact'))
  }
  return {
    message: responseMessage('success', 'fetched', 'Contact'),
    data: { result: contactData },
  }
}

exports.createContact = async (body) => {
  const { firstName, lastName, email, phoneNumber, title, companyId } = body
  const contactPayload = {
    firstName,
    lastName,
    email,
    phoneNumber,
    title,
    companyId: companyId ? companyId : null,
  }
  await contact.create(contactPayload)
  return {
    message: responseMessage('success', 'created', 'Contact'),
  }
}
