const express = require('express')
const router = express.Router()
const wilderController = require('./../controllers/wilder')
const { wilderValidation } = require('./../validation')

router.post('/create', wilderValidation.create, wilderController.create)
router.get('/all', wilderController.all)
router.delete('/delete', wilderController.delete)
//router.delete('/delete/:_id', wilderController.deleteById)
//router.delete('/delete', wilderController.deleteByIdQuery)
router.put('/update', wilderController.update)
router.get('/find/:_id', wilderController.find)

module.exports = router