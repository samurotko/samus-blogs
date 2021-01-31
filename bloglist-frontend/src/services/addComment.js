import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { comment } from '../reducers/blogReducer'


const AddComment = ({ id }) => {

  const [newComment, setComment] = useState('') 
  
  const dispatch = useDispatch()
    const addComment = (event) => {
        event.preventDefault()
        console.log('dispatching',newComment,id)
        dispatch(comment({ comment:newComment,id:id }))
        setComment('')
    }


    const handleComment = (event) => {
        console.log('handleComment',event.target.value)
        setComment(event.target.value)
    }

    return(
    <form onSubmit={addComment}>
        <div>
       
          comment: <input 
            id='comment'
            value={newComment} 
            onChange={handleComment}
            />
        </div>
        <div>     
          <button type='submit'>add comment</button>
        </div>
      </form>
      )

}



export default AddComment