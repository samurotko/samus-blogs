const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const config = require('../utils/config')



blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => { 
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.get('/:id/comments', async (request, response) => { 
  const comment = await Blog.findById(request.params.id).comments
  response.json(comment)
})

  
blogsRouter.post('/', async (request, response) => {
  
    const body = request.body
    console.log("body",body)

  const token = request.token
  console.log("token is",request.token)
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

    if(!user) throw Error("Bad Request")
    console.log("user",user)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id

    })
    console.log("posting blog",blog)
    

    if(!blog.likes){
      blog.likes=0
    }
    console.log("status")
    const savedBlog = await blog.save()
    console.log("savedBlog",savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  })

  blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    console.log("body",body)
    const blog = await Blog.findById(request.params.id)
    const comment = new Comment({content: body.content})
    console.log('posting comment',comment)
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      comments: blog.comments.concat(comment)
    }

    console.log("posting blog",newBlog)
    const updated = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updated.toJSON())
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    console.log("body",body)
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments
    }
    console.log("blogbody",blog)
  
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updated)
  })



  blogsRouter.delete('/:id', async (request, response) => {
    const body = request.body
    console.log("body",body)
    console.log("id",request.params.id,typeof request.params.id)


    const blog = await Blog.findById(request.params.id)
    const token = request.token
    console.log("token is",request.token)
    const decodedToken = jwt.verify(request.token, config.SECRET)
    console.log("decodedToken.id",decodedToken.id)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if(blog.user.toString()===decodedToken.id.toString()){
      console.log("deleting...")
      const d= await Blog.findByIdAndDelete(request.params.id)
      console.log('deled succesfully',d)
      response.json(d)
    }else{
      return response.status(401).json({ error: 'user unauthorised' })
    }
    
    
    
  })

  module.exports = blogsRouter