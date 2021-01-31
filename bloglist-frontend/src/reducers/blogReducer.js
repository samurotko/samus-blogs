import blogs from '../services/blogs'


export const createNew = (blog) => {
  return async dispatch => {
    const newBlog = await blogs.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
  
}

export const like = (newObject) => {

    return async dispatch => {
      const updated = await blogs.update(newObject)
      console.log('updated is',updated)
      dispatch({
        type: 'LIKE_BLOG',
        data: newObject,
      })
    }
  
}

export const deleteBlog = (id) => {
    console.log('deleting',id)
    return async dispatch => {
        const removed = await blogs.remove(id)
        console.log('deleted:', removed)
        dispatch({
            type: 'DELETE_BLOG',
            data: id,
        })
    }
}

export const initializeBlogs = () => {
  
  return async dispatch => {
      console.log('initalizeBlogs')
    const allBlogs = await blogs.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: allBlogs,
    })
  }
}

export const comment = (props) => {
  console.log('comment,id',props)
  return async dispatch => {
    const postedComment = await blogs.comment(props)
    console.log('posted comment',postedComment)
    dispatch({
      type: 'COMMENT',
      data: postedComment,
    })
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){

    case 'NEW_BLOG':
      console.log('case new, state is',state)
      console.log('action.data is',action.data)
      return [...state, action.data]

    case 'LIKE_BLOG': {

      console.log('liking, state is',state)
   
      const liked = action.data
      console.log('liked is',liked)
      return state.map(a =>
        a.id !== liked.id ? a : liked 
      ).sort((a,b) => b.likes-a.likes)
    }

    case 'DELETE_BLOG': {
        console.log('case delet, state is',state)
        console.log('action.data is',action.data)
        const id = action.data
        const newBlogs = [...state]
        console.log('new blog1',newBlogs,id)
        newBlogs.splice(state.findIndex(blog => blog.id===id),1)
        console.log('new blog2', newBlogs)
        return newBlogs
    }

    case 'INIT_BLOGS': {
      console.log('initing',action.data)
      return action.data.sort((a,b) => b.likes-a.likes)
    }
    
    case 'COMMENT': {
        console.log('case comment, state is',state)
        console.log('action.data is',action.data)
        const commented = action.data
        return state.map(a =>
          a.id !== commented.id ? a : commented 
        )
    }
    default: 
      return state
  }
  
}

export default blogReducer