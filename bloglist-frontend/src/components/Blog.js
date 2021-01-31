import React, { useState } from 'react'
import  { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogReducer'
import AddCommet from '../services/addComment'



const Blog = () => {
    const [viewAll, setViewAll] = useState(false)
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)

    const id = useParams().id
    console.log('rendering blog',blogs,id)
    if(!blogs||blogs.length===0){
        return null
    }
    
    console.log('id',id,Number(id))
    const blog = blogs.find(n => n.id === id)
    console.log('blog is',blog)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      
    }

    const hideWhenVisible = { display: viewAll ? 'none' : '' }
    const showWhenVisible = { display: viewAll ? '' : 'none' }
    
    const toggleVisibility = () => {
        setViewAll(!viewAll)
    }

    const likeBlog = () => {

          const newBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes +1,
            user: blog.user,
            id: blog.id,
            comments: blog.comments
          }

          dispatch(like(newBlog))

    }

    const removeBlog = async () => {
          if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
            
          const id = blog.id
          dispatch(deleteBlog(id))

          }
        
    }

      return(
          <div id='blog' style={blogStyle}>
            <div  style={hideWhenVisible}>
              {blog.title} {blog.author}
              <button id ='view' onClick={toggleVisibility}>view</button>
            </div>
            <div   style={showWhenVisible}>
              <p>{blog.title} {blog.author}
                  <button onClick={toggleVisibility}>hide</button>
              </p>
              <p>{blog.url}</p>
              <p id='likes'>likes {blog.likes}
                  <button id='like' onClick={likeBlog}>like</button>
              </p>
              <p>{blog.user.name}</p>
                  <button id='remove' onClick={removeBlog}>remove</button>


              <b>comments</b>
              <ul>
                {blog.comments.map(comment => <li key={comment._id}>
                  {comment.content}
                </li>)}
              </ul>
              
            </div>
            <AddCommet id={id}/>
          </div>
      )}

export default Blog
