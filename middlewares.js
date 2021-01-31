
const tokenExtractor = (request, response, next) => {
    if(request) console.log("req",request.headers.authorization)
    
    
    authorization = request.headers.authorization
    
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      console.log("parsed token", authorization.substring(7))
   request.token = authorization.substring(7)
  }
  next()
}


module.exports = {tokenExtractor}