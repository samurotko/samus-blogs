import React from 'react'
import  { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

  
  const User = () => {
    const users = useSelector(state => state.user)
    const id = useParams().id
    console.log('rendering user',users,id)
    if(users.constructor !== Array){
        return null
    }
    
    console.log('id',id,Number(id))
    const user = users.find(n => n.id === id)
    console.log('user is',user)
    return (
      <div>
        <h1>{ user.name }</h1>
        <h2>added blogs</h2>
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>
              { blog.title }
              </li>)}
        </ul>
      </div>
    )
}

export default User