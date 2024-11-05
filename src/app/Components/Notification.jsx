import React, { useContext } from 'react'
import { UserContext } from './UserContext';

const Notification = () => {
  const { isLoged, userId,ViewNotfi, setViewNotfi, NOtifItems, setNOtifItems } = useContext(UserContext);

  return (
    <div className=""></div>

  )
}

export default Notification