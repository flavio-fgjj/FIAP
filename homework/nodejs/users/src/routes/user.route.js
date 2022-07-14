const { Router } = require('express')
const UserController = require ('../controllers/user.controller')
const { validateCreateUser, validateUpdateUserPassword } = require('../schemas/userSchema.schema')

const userController = new UserController()

const router = Router()

router.post('/', validateCreateUser, userController.create)


router.put(
  '/alterarsenha/:id',
  validateUpdateUserPassword,
  userController.updatePassword
);
router.delete('/:id', userController.delete)

router.post('/login', userController.auth)

module.exports = router