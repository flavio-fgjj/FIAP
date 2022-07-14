const Model = require('../model/financial.model')

class FinancialController {
  listById = (req, res) => {
    Model.findById(req.params.id, (err, data) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Erro ao localizar por ID -> ${err}` })
      }
      return res.status(200).send({ output: 'Ok', payload: data })
    })
  }

  list = (req, res) => {
    Model.find((err, data) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Erro ao listar as finanças -> ${err}` })
      }
      return res.status(200).send({ output: 'Ok', payload: data })
    })
  }

  create = (req, res) => {
    const data = new Model(req.body)
    data
      .save()
      .then((result) => {
        res.status(201).send({
          output: 'Cadastro realizado',
          payload: result,
        })
      })
      .catch((err) =>
        res.status(500).send({ output: `Erro ao cadastrar -> ${err}` })
      )
  }

  update = (req, res) => {
    Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(500).send({
            output: `Erro ao atualização-> ${err}`,
          });
        }
        if (!data) {
          return res.status(400).send({
            output: `Não foi possível atualizar -> ${err}`,
          })
        }
        return res.status(202).send({ output: 'Atualizado', payload: data })
      }
    )
  }

  delete = (req, res) => {
    Model.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Erro ao tentar apagar -> ${err}` })
      }
      res.status(202).send({})
    })
  }
}

module.exports = FinancialController