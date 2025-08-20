const { sendAPIerror } = require('../../middleware/apiError')
const { company, contact } = require('../../models')
const { responseMessage } = require('../../utils/responseMessage')
const statusCode = require('../../utils/statusCode')
const { getPagination, generatePaginatedResponse } = require('../../helper/common')

exports.getCompanies = async (queryParams) => {
  const paginationOptions = getPagination(queryParams)
  const page = parseInt(queryParams.page) || 1

  const companyData = await company.findAndCountAll({ ...paginationOptions })
  return {
    message: responseMessage('success', 'Fetched', 'Companies'),
    data: generatePaginatedResponse(companyData, paginationOptions, page),
  }
}

exports.getCompanyById = async (companyId) => {
  const companyData = await company.findOne({
    where: { id: companyId },
    include: [{ model: contact }],
  })
  if (!companyData) {
    return sendAPIerror(statusCode.NOTFOUND, responseMessage('not_found', 'Company'))
  }
  return {
    message: responseMessage('success', 'fetched', 'Companies'),
    data: { result: companyData },
  }
}

exports.createCompany = async (body, transaction) => {
  const { name, industry, website, phone, address, contactData } = body

  const existingCompany = await company.findOne({ where: { name } })
  if (existingCompany) {
    return sendAPIerror(statusCode.CONFLICT, responseMessage('already_exists', 'Company name'))
  }
  const companyPayload = {
    name,
    industry,
    website,
    phone,
    address,
  }
  const createdCompany = await company.create(companyPayload, { transaction })
  if (Array.isArray(contactData) && contactData.length > 0) {
    const contactsToInsert = contactData.map((contactItem) => ({
      ...contactItem,
      companyId: createdCompany.id,
    }))

    await contact.bulkCreate(contactsToInsert, { transaction })
  }
  return {
    message: responseMessage('success', 'created', 'Company'),
  }
}
