import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteNotification } from '../reducers/notificationReducer'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  console.log('notification',notification)

  if (notification.message === '') {
        return null
  }
  setTimeout(() => dispatch(deleteNotification()),notification.time*1000)
    //console.log('props',props)
    const notificationStyle =  {
        color: notification.color,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    return (
      <div className='notification' style={notificationStyle}>
        {notification.message}
      </div>
    )
  
  // return (
  //     <div className='notification' style={notificationStyle}>
  //         {props.message.message}
  //     </div>
  // )
}


export default Notification