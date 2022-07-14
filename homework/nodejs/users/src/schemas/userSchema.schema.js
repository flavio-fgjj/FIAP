const Joi = require ('joi')
const validateBody = require ('../utils/schemaValidator.util')

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const fullnameRegex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i
const passwordRegex = /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))/

const validateCreateUser = async (req, res, next) => {
  const schema = Joi.object().keys({
    nomeusuario: Joi.string().min(4).required().messages({
      'string.min': 'userName deve ter ao menos 4 dígitos',
      'any.required': 'o campo userName é obrigatório',
    }),
    senha: Joi.string().min(6).regex(passwordRegex).required().messages({
      'string.pattern.base':
        'o senha deve possuir ao menos 1 dígito numérico, 1 letra minúscula e 1 letra maiúscula',
      'any.required': 'o campo senha é obrigatório',
      'string.min': 'o campo senha deve ter no mínimo 6 digitos',
    }),
    nomecompleto: Joi.string().required().regex(fullnameRegex).messages({
      'string.pattern.base': 'o fullname informado é inválido',
      'any.required': 'o campo fullname é obrigatório',
    }),
    email: Joi.string().required().regex(emailRegex).messages({
      'string.pattern.base': 'o email informado é inválido',
      'any.required': 'o campo email é obrigatório',
    }),
    telefone: Joi.string().required().messages({
      'any.required': 'o campo phone é obrigatório',
    }),
    datacadastro: Joi.string().required().messages({
      'any.required': 'a Data de Cadastro é obrigatória',
    }),
  })
  try {
    await validateBody(req, next, schema)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const validateUpdateUserPassword = async (req, res, next) => {
  const schema = Joi.object().keys({
    currentPassword: Joi.string().min(6).required().messages({
      'any.required': 'o campo senha atual é obrigatório',
      'string.min': 'o campo senha tual deve ter no mínimo 6 digitos',
    }),
    newPassword: Joi.string().min(6).regex(passwordRegex).required().messages({
      'string.pattern.base':
        'o campo nova senha deve possuir ao menos 1 dígito numérico, 1 letra minúscula e 1 letra maiúscula',
      'any.required': 'o campo nova senha é obrigatório',
      'string.min': 'o campo nova senha deve ter no mínimo 6 digitos',
    }),
    confirmNewPassword: Joi.any()
      .valid(Joi.ref('newPassword'))
      .required()
      .messages({
        'any.required': 'o campo é obrigatório',
        'any.only':
          'as senhas são diferentes',
      }),
  })

  try {
    await validateBody(req, next, schema)
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports =  { validateCreateUser, validateUpdateUserPassword }