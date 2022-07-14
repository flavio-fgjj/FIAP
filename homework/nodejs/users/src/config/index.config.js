require('dotenv').config()

const config = {
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires: process.env.JWT_EXPIRES,
  salt: process.env.SALT,
  db_path: process.env.MONGO_PATH,
}

module.exports = config