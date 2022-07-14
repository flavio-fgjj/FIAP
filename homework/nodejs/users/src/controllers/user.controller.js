const bcrypt = require('bcrypt')
const { uuidv4 } = require('uuid')
const config = require('../config/index.config')
const Model = require('../model/User.model')
const createToken = require('../utils/createToken.util')

class UserController {
  create = (req, res) => {
    bcrypt.hash(req.body.senha, parseInt(config.salt, 10), (err, result) => {
      if (err) {
        return res.status(500).send({
          output: `Erra ao gerar senha -> ${err}`,
        })
      }
      req.body.senha = result
      req.body.apikey = uuidv4()

      const data = new Model(req.body)
      data
        .save()
        .then((result) => {
          res.status(201).send({
            output: 'Cadastro realizado!',
            payload: result,
          })
        })
        .catch((err) =>
          res.status(500).send({ output: `Erro ao cadastrar -> ${err}` })
        )
    })
  }

  updatePassword = (req, res) => {
    Model.findById(req.params.id, (err, result) => {
      if (err) {
        return res.status(500).send({
          output: `Erro ao tentar trocar a senha -> ${err}`,
        });
      }
      bcrypt.compare(req.body.currentPassword, result.password, (err, same) => {
        if (err) {
          return res.status(500).send({
            output: `Erro ao atualizar a senha ->${err}`,
          })
        }
        if (!same)
          return res.status(400).send({ output: 'Senha atual inválida' });
        bcrypt.hash(
          req.body.novasenha,
          parseInt(config.salt, 10),
          (err, result) => {
            if (err) {
              return res.status(500).send({
                output: `Erra ao gerar a nova senha -> ${err}`,
              })
            }
            Model.findByIdAndUpdate(
              req.params.id,
              { senha: result },
              { novasenha: true },
              (err, data) => {
                if (err) {
                  return res.status(500).send({
                    output: `Erro ao processar a atualização -> ${err}`,
                  })
                }
                if (!data) {
                  return res.status(400).send({
                    output: `Não foi possível atualizar nova senha -> ${err}`,
                  })
                }
                return res.status(202).send({
                  output: 'Nova senha atualizada',
                  payload: data,
                })
              }
            )
          }
        )
      })
    })
  }

  delete = (req, res) => {
    Model.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Não foi possível remover o Usuário -> ${err}` })
      }
      res.status(202).send({})
    })
  }

  auth = (req, res) => {
    Model.findOne({ nomeusuario: req.body.nomeusuario }, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Erro ao localizar o Usuário -> ${err}` })
      }
      if (!result) {
        return res.status(400).send({ output: 'Usuário não localizado' })
      }
      bcrypt.compare(req.body.senha, result.senha, (err, same) => {
        if (err) {
          return res
            .status(500)
            .send({ output: `Erro ao validar a senha ->${err}` });
        }
        if (!same) return res.status(400).send({ output: 'Senha inválida' })

        const tokenGenerated = createToken(
          result._id,
          result.nomeusuario,
          result.email
        );
        return res.status(200).send({
          output: 'Usuário Autenticado',
          message:
            'Cadastre os dados financeiros em: http://localhost:3001/financial/register',
          token: tokenGenerated,
          apikey: result.apikey,
        })
      })
    })
  }
}

module.exports = UserController