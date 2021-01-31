const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const Blog = require('../models/blog')
const blog = require('../models/blog')


describe('blog tests', () => {
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.blogs)
    await User.insertMany(helper.users)
   
    // let i = 0

    // for (let user of helper.users) {
    //   let userObject = new User({
    //     username: user.username,
    //     name: user.name,
    //     password: user.password
    //   })
    //   const saved = await userObject.save()
      

    //   for(j=1;j<=2;j++){
        
    //   let blogObject = new Blog({
    //     title: helper.blogs[i].title,
    //     author: helper.blogs[i].author,
    //     url: helper.blogs[i].url,
    //     likes: helper.blogs[i].likes,
    //     user: saved._id
    //   })
    //   const savedBlog=await blogObject.save()
    //   console.log("saved",saved,savedBlog)
    // i++
  })


    
    
  


test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(6)
  })

  test('id defined', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "samun blogi",
        author: "samu rotko",
        url: "https://samunblogiparasblogi.com",
        likes: 69
    }

    const loginInfo = {
      username: "samu",
      password: "salasana"
    }
    const token= await api.post('/api/login').send(loginInfo)
    console.log("samu's token: ",token)
  
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    
    const blogsAtEnd = await helper.blogsInDb()
    console.log("blogsAtEnd",blogsAtEnd)
    console.log("users at the end",await helper.usersInDb())
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
  
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
        "samun blogi"
    )
  })

  test('zero likes', async () => {
    const newBlog = {
        title: "zero",
        author: "zero",
        url: "https://0000"
        
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
  
    
    expect(blogsAtEnd[helper.blogs.length].likes).toBe(0)
})


test('error 400', async () => {
    const newBlog = {

        author: "error"
       
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  
    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)
  
})
})




describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })


  test('creation fails with proper statuscode and message if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'samu',
      name: 'Supersamu',
      password: 'aa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })


  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})