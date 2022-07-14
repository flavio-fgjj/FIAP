const { Router } = require('express')
const FinancialController = require('../controllers/financial.controller')
const validateFinancial = require('../schemas/financial.schema')
const auth = require('../middleware/auth.mdw')

const controller = new FinancialController()

const router = Router()

router.get('/', auth, controller.list)
router.get('/:id', auth, controller.listById)
router.post('/', auth, validateFinancial, controller.create)
router.put('/:id', auth, validateFinancial, controller.update)
router.delete('/:id', auth, controller.delete)

module.exports = router

