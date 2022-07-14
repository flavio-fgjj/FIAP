const jwt = require ('jsonwebtoken')
const config = require ('../config/index.config')

const { sign } = jwt

const createToken = (id, nomeusuario, email) => {
  const token = sign({ id, nomeusuario, email }, config.jwt_secret, {
    expiresIn: config.jwt_expires,
  })
  return token
}

module.exports = createToken