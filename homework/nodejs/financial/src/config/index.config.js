require('dotenv').config()

const config = {
  jwt_secret: process.env.JWT_SECRET,
  db_path: process.env.DB_PATH,
}

module.exports = config
