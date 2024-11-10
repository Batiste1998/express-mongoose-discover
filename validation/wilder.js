const { body, validationResult } = require('express-validator')

const create = [
  body('name').isLength({ min: 3 }).withMessage('The name must be at least 3 characters'),
  (req, res, next) => {
    const errorsValidation = validationResult(req)
    if (!errorsValidation.isEmpty()) {
      let errors = {}
      errorsValidation.errors.map((err) => {
        errors = { ...errors, [err.path]: err.msg }
      })
      res.status(400).json({ success: false, result: errors })
    } else {
      next()
    }
  }
]

module.exports = { create }