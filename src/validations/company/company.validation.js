const { body, param } = require('express-validator')

const createCompany = [
  body('name')
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2 })
    .withMessage('Company name must be at least 2 characters'),
  body('industry').optional().isString().withMessage('Industry must be a string'),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
  body('phone')
    .optional()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .withMessage('Phone number must be valid'),
  body('address').optional().isString().withMessage('Address must be a string'),
]

const getCompanyById = [
  param('id')
    .notEmpty()
    .withMessage('Company ID is required')
    .isNumeric()
    .withMessage('Company ID must be a number'),
]

module.exports = {
  createCompany,
  getCompanyById,
}
