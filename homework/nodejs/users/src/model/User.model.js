const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  nomeusuario: { type: String, unique: true },
  nomecompleto: { type: String },
  senha: { type: String },
  email: { type: String, unique: true },
  telefone: { type: String },
  apikey: { type: String, unique: true },
  datacadastro: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Users', usersSchema)
