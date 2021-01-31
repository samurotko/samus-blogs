const app = require('./app')
const http = require('http')

const config = require('./utils/config')
const logger = require('./utils/logger')


const server = http.createServer(app)


const PORT = config.PORT
const HOST = config.HOST
app.listen(PORT, HOST, () => {
  logger.info(`Server running on port ${PORT}, host ${HOST}`)
})