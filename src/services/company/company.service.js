const { sendAPIerror } = require('../../middleware/apiError')
const { company } = require('../../models')
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
  })
  if (!companyData) {
    return sendAPIerror(statusCode.NOTFOUND, responseMessage('not_found', 'Company'))
  }
  return {
    message: responseMessage('success', 'fetched', 'Companies'),
    data: { result: companyData },
  }
}

exports.createCompany = async (body) => {
  const { name, industry, website, phone, address } = body
  const companyPayload = {
    name,
    industry,
    website,
    phone,
    address,
  }
  await company.create(companyPayload)
  return {
    message: responseMessage('success', 'created', 'Company'),
  }
}
