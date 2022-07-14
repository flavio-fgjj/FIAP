const jwt = require('jsonwebtoken')

const config = require('../config/index.config')

const validateToken = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).send({
      output: 'Não autorizado',
    })
  }

  const token = authorization.replace('Bearer ', '').trim()
  if (!token) return res.status(401).send({ output: 'Não autorizado' })

  jwt.verify(token, config.jwt_secret, (erro, result) => {
    if (erro) {
      return res.status(401).send({ output: `Token inválido -> ${erro}` })
    }
    req.data = {
      id: result.id,
      nomeusuario: result.nomeusuario,
      email: result.email,
    }
    next()
  })
}

module.exports = validateToken
