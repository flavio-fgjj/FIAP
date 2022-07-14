const Joi = require('joi')
const validateBody = require('../utils/schemaValidator.util')

const fullnameRegex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i

const validateFinancial = async (req, res, next) => {
  const schema = Joi.object().keys({
    nome_banco: Joi.string().required().messages({
      'any.required': 'o nome do banco é obrigatório',
    }),
    tipo_conta: Joi.string()
      .valid('corrente', 'poupança', 'salário')
      .required()
      .messages({
        'any.required': 'o tipo da conta é obrigatório',
        'any.only':
          'o tipo da conta deve ser: "corrente", "poupança", "salário"',
      }),
    nome_titular: Joi.string().required().regex(fullnameRegex).messages({
      'string.pattern.base': 'o nome do titular informado é inválido',
      'any.required': 'o nome do titular é obrigatório',
    }),
    limite_cartao: Joi.number().required().messages({
      'any.required': 'O campo limite de crédito é obrigatório',
    }),
    apikey: Joi.string().required().messages({
      'any.required': 'o campo apikey é obrigatório',
    }),
  })
  try {
    await validateBody(req, next, schema)
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = validateFinancial
