import React, { useState, useEffect } from 'react';
// import { socket } from '../../main';
import axiosUrl from "../url/Axiosurl";

const Notification = ({socket}) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const fetchNotifications = async () => {
      await axiosUrl.get('/notification').then((response)=>{
        console.log(response.data.data,'get response http');
        setNotifications(response.data.data,'get response http');
      }).error((error)=>{
        console.log(error)
      })
    };
    fetchNotifications();

  
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
    <div className="mt-5">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <>
          <div className=" bg-slate-200 px-5 py-5 my-1 rounded-2xl">
            <div className="flex justify-between">
              <div>
                <h1>Image</h1>
              </div>
              <div>
                 <h1>{notification.createdAt}</h1>
              </div>
              <div>
                <h1>...</h1>
              </div>
            </div>
            <div>
              <h1>{notification.message}</h1>
            </div>
          </div>
          {/* <li key={notification._id}>{notification.message}</li> */}
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


