import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import {
  Button,
  Toolbar,
  AppBar,
  TextField,
} from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Blog from './components/Blog'
import BlogList from './components/blogs'
import Notification from './services/notifications'
import { initializeBlogs } from './reducers/blogReducer'
import { logIn, loggedIn, allUsers } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'


const App = () => {
    
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()
    useEffect(() => {
      console.log('initializing')
      dispatch(initializeBlogs())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
    var user = useSelector(state => state.user)
    console.log('blogs',blogs)


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch(loggedIn(user))
      }
    }, [dispatch])
  


    const handleLogin = async (event) => {
      event.preventDefault()
      console.log('logging in with', username, password)
        dispatch(logIn(username,password))
        setUsername('')
        setPassword('')

    }


    
    if (user === null) {
    return (
      <Container>
    <div>
      <Notification/>
      <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <TextField
              type="text"
              id='username'
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <TextField
              type="password"
              id='password'
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button variant="contained" color="primary" id="login-button" type="submit">login</Button>
        </form>
        <i>You can Login using username: user password: user</i>
        <i>

        App uses mongoDB as a database, Redux based Flux architecture and it has separate front- and backends 
        (nested together for deployment). I have also implemented Github Actions based CI/CD pipeline,
        with Eslint, Jest and Cypress testing.
        </i>
        </div>
        </Container>
  )}

  return(
    <Container>
    <div>
      <Router>

    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/users" onClick={() => dispatch(allUsers())}>
          users
        </Button>
          <em>{user.name} logged in</em>  
        <Button color="inherit" onClick={() => {
          window.localStorage.clear()
          window.location.reload()
          }}>
          logOut
        </Button> 
      </Toolbar>
    </AppBar>
      

  <Notification/>

      <Switch>
        <Route path="/users/:id">
            <User />
        </Route>
        <Route path="/users">
            <Users/>
        </Route>
        <Route path="/blogs/:id">
        <Blog />
        </Route>
        <Route path="/">
        <BlogList blogs={blogs}/>
        </Route>
      </Switch>
      
    </Router>
    </div>
    </Container>
)
}

export default App