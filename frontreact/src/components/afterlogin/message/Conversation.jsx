import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import axiosUrl from '../../url/Axiosurl'
import {jwtDecode} from 'jwt-decode';


const Conversation = () => {
  const[conversation, setConversation] = useState([])
  const[currentChat, setCurrentChat] = useState(null) 
  const[messages,setMessages ] = useState([])

  const token = localStorage.getItem('token');
  let currentUserId;

  if (token) {
    const decodedToken = jwtDecode(token);
    currentUserId = decodedToken.id;
  }
  // console.log(userId,'userId');

  useEffect(()=>{
    axiosUrl.get('/message').then((response)=>{
        console.log(response.data.data,'response message data')
        setMessages(response.data.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  return (
    <>
     {!currentChat ? (
        <div className="flex flex-col h-screen">
          <div className="h-[10vh] bg-yellow-500">
            top user data
          </div>
          <div className="h-[60vh] p-4">
            center message
            {messages.map((data, index) => {
              return(
              <div key={index} className={`flex ${data.receiverId === currentUserId ? 'justify-start' : 'justify-end'} my-2`}>
                <div className={`p-2 rounded-lg max-w-xs ${data.receiverId === currentUserId ? 'bg-blue-300' : 'bg-gray-200'}`}>
                  <h1>{data.message}</h1>
                </div>
              </div>
              )
              })}
          </div>
          <div className="h-[10vh] bg-gray-500 flex items-center p-4">
            <Input placeholder="Basic usage" className="w-full" />
          </div>
        </div>
      ) : (
        <h1>select people to communicate with them</h1>
      )
    }
    </>
    )
    }


export default Conversation