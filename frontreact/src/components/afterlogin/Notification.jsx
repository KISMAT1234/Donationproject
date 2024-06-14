import React, { useState, useEffect } from 'react';
import { socket } from '../../main';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
  
    // console.log('came in notification component')
    socket.on("notification", (data) => {
      console.log(data,'socket connection successfull in frontend')
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
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
          <>
          <div>
            <div className="flex">
              <div>
                <h1>Image</h1>
              </div>
              <div>
                 <h1>time</h1>
              </div>
            </div>
          </div>
          <li key={notification._id}>{notification.message}</li>
          {/* <li key={notification._id}>{notification.}</li>
          <li key={notification._id}>{notification.message}</li>
          <li key={notification._id}>{notification.message}</li> */}
          </>
        ))}
      </ul>
    </div>
  );
};

export default Notification;


