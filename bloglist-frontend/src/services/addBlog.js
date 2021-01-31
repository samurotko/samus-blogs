import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  TextField,
  Button
} from '@material-ui/core'
import { notification } from '../reducers/notificationReducer'
import { createNew } from '../reducers/blogReducer'


const AddBlog = () => {

  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('') 
  const [newUrl, setNewUrl] = useState('') 
  const dispatch = useDispatch()
    const addBlog = (event) => {
        event.preventDefault()
        
        const blog = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }
        
        dispatch(createNew(blog))
        
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        dispatch(notification('green', `A new blog ${blog.title} by ${blog.author} added` ,5))
        // setTimeout(() => {
        //     props.setNotification(null)
        //   }, 5000)
        
    }


    const handleTitle = (event) => {
        console.log('handleTitle',event.target.value)
        setNewTitle(event.target.value)
    }

    const handleAuthor = (event) => {
        console.log('handleAuthor',event.target.value)
        setNewAuthor(event.target.value)
    }

    const handleUrl = (event) => {
        console.log('handleUrl',event.target.value)
        setNewUrl(event.target.value)
    }

    return(
    <form onSubmit={addBlog}>
        <div>
        <TextField label="title" value={newTitle} 
            onChange={handleTitle}/>

        </div>
        <div>
        <TextField label="author" value={newAuthor}
            onChange={handleAuthor}/>
         
        </div>
        <div >
        <TextField label="url" value={newUrl}
            onChange={handleUrl}/>
          
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
          create
          </Button>
        </div>
      </form>
      )

}



export default AddBlog