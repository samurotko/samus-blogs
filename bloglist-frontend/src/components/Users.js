import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { allUsers } from '../reducers/userReducer'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const UserList = () => {
    const dispatch = useDispatch()
    console.log('dispatching')
    //dispatch(allUsers())
    console.log('dispatched')
    const users = useSelector(state => state.user)
    console.log('users are',users)
    if(users.constructor !== Array){
      return null
    }

    const numOfBlogs = (user) => {
      if(user.blogs){
        return user.blogs.length
      }
      return 0
    }

    return(
    <div>
        
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
          <TableRow>
            <TableCell></TableCell>
            <TableCell><b>blogs created</b></TableCell>
            </TableRow>
              {users.map(user => <TableRow key={user.id} >
                <TableCell> 
                  <Link to={`/users/${user.id}`} onClick={() => dispatch(allUsers())}>{user.username}</Link>
                </TableCell>
                <TableCell>{numOfBlogs(user)}</TableCell>
            </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList