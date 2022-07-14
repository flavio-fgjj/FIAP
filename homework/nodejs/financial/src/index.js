require('dotenv').config()

const express =  require('express')
const helmet =  require('helmet')
const morgan =  require('morgan')
const mongoose =  require('mongoose')
const cors =  require('cors')

const notfound = require('./middleware/notfound.mdw')
const config = require('./config/index.config')
const routes = require('./routes/financial.route')

const app = express()

app.use(
  express.json(),
  express.urlencoded({
    extended: true,
  }),
  cors(),
  helmet(),
  morgan('combined'),
  routes,
  notfound
)

mongoose.connect(config.db_path, { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(process.env.PORT || 3001, () => console.log(`Servidor on-line! Porta: ${process.env.PORT || 3001}`))