const initialState = { color: '', message: '', time: 5 }


export const notification = (color, message, time) => {
  console.log('calling notification')
  return dispatch => {
    
    // clearTimeout(timer);
    // timer = setTimeout(()=>dispatch(deleteNotification()),time*1000)
    dispatch({
        type: 'NOTIFICATION',
        data: { color: color, message: message, time: time }
    })
}
}

export const deleteNotification = () => {
    return dispatch => {
        dispatch({
        type: 'DELETE_NOTIFICATION',
        data: { color: '', message: '' }
    })
    }
}

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch(action.type){
  
        case 'NOTIFICATION':
            console.log('case new, state is',state)
            console.log('action.data is',action.data)
            return action.data

        case 'DELETE_NOTIFICATION':
            
            return action.data

      default: 
        return state
    }
    
  }
  
  export default notificationReducer