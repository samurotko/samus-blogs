const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
require('express-async-errors')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1 })
  console.log("users are",users)
  response.json(users.map(u => u.toJSON()))
})


usersRouter.post('/', async (request, response) => {
  const body = request.body
  console.log("password",body.password)
  console.log("password length",body.password.length )
  if (body.password.length <= 3) {
    return response.status(400).json({ error: 'password too short' })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  console.log("hash:",passwordHash)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  
  

  const savedUser = await user.save()
 

  response.json(savedUser)
})



module.exports = usersRouter