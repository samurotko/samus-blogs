require('dotenv').config()

let PORT = process.env.PORT || 5000
let MONGO_URL = process.env.MONGO_URL || "mongodb+srv://BDuser:ocfeARkd2zvSIq4B@cluster0.ls8am.mongodb.net/bloglist?retryWrites=true&w=majority"
let SECRET = process.env.SECRET || "jhvjvvgyc"
let HOST = process.env.MY_HOST || '0.0.0.0'

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGO_URL,
  PORT,
  SECRET,
  HOST
}