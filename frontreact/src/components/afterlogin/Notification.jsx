import React, { useState, useEffect } from 'react';
import { socket } from '../../main';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
  
    console.log('came in notification component')
    socket.on('notification', (notification) => {
      console.log(notification,'socket connection successfull in frontend')
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    return () => {
      socket.off('notification')
    };
  }, []);

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;