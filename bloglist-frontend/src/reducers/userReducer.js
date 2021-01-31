import blogService from '../services/blogs'
import loginService from '../services/login' 
import userService from '../services/users'
import { notification } from './notificationReducer'


const initialState=null

export const logIn = (username,password) => {
  return async dispatch => {
    try {
    const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      console.log('logged in!')
    dispatch({
      type: 'LOGIN',
      data: { username: username, password: password },
    })
  } catch (exception) {
      console.log('login failed!')
    dispatch(notification( 'red', 'wrong username or password', 5 ))
  }
}
  
}

export const loggedIn = (user) => {
    return dispatch => {
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGGEDIN',
            data: user
        })
    }
}

export const allUsers = () => {
  return async dispatch => {
    const allUsers = await userService.getAll()
    console.log('all users',allUsers)
    dispatch({
        type: 'ALL_USERS',
        data: allUsers
    })
}
}


//const initialState = anecdotesAtStart.map(asObject)

const userReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){

    case 'LOGIN':
      console.log('case login, state is',state)
      console.log('action.data is',action.data)
      return action.data

    case 'LOGGEDIN':
        console.log('case loggedin, state is',state)
        console.log('action.data is',action.data)
        return action.data

    case 'ALL_USERS':
        console.log('case all users, state is',state)
        console.log('action.data is',action.data)
        return action.data
    
    default: 
      return state
  }
  
}

export default userReducer