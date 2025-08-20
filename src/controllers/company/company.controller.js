const services = require('../../services')
const { sendSuccess } = require('../../middleware/apiError')
const { apiHandler } = require('../../middleware/globalErrorHandler')

exports.getCompanies = apiHandler(async (req, res) => {
  const result = await services.companyService.getCompanies(req.query)
  sendSuccess({ res, ...result })
})

exports.getCompanyById = apiHandler(async (req, res) => {
  const result = await services.companyService.getCompanyById(req.params.id)
  sendSuccess({ res, ...result })
})

exports.createCompany = apiHandler(async (req, res) => {
  const result = await services.companyService.createCompany(req.body)
  sendSuccess({ res, ...result })
})
