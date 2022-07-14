const mongoose = require('mongoose')

const financialsSchema = new mongoose.Schema({
  nome_banco: { type: String },
  tipo_conta: { type: String },
  nome_titular: { type: String },
  limite_cartao: { type: String },
  apikey: { type: String, unique: true },
  data_cadastro: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Financials', financialsSchema)
