import React, { useEffect, useState,useRef } from 'react'
import { Input } from 'antd';
import axiosUrl from '../../url/Axiosurl'
// import {jwtDecode} from 'jwt-decode';
import { userId } from '../../../main';
import Sidebar from './Sidebar';



const Conversation = () => {
  const[conversation, setConversation] = useState([])
  const[currentChat, setCurrentChat] = useState(null) 
  const[messages,setMessages ] = useState([])
  const[inputMessage, setInputMessage] = useState();

  // const token = localStorage.getItem('token');
  // let currentUserId;

  // if (token) {
  //   const decodedToken = jwtDecode(token);
  //   currentUserId = decodedToken.id;
  // }
  console.log(currentChat?._id,'currentchat');

  useEffect(()=>{
    axiosUrl.get(`/message/${currentChat?._id}`).then((response)=>{
        console.log(response.data.data.messages,'response chat-message data')
        setMessages(response.data.data.messages)
    }).catch((error)=>{
      console.log(error)
    })
  },[currentChat])

  const handleSubmit = async (e) => {
    e.preventdefault()
    const messageInfo = {
      senderId: userId,
      receiverId: currentChat,
      message: inputMessage
    }

    try{
      axiosUrl.post('/message',messageInfo).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
    }catch(err){

    }

  }



  return (
    <>
      <div className="flex px-10 py-10">
        <div  className="w-[25%] h-[80vh] bg-red-500">

      
        </div>
        <div className="w-[75%] h-[80vh] bg-green-500">
         {currentChat ? (
            <div className="flex flex-col h-screen">
              <div className="h-[10vh] bg-yellow-500">
                top user data
              </div>
              <div className="h-[60vh] p-4" ref={scrollRef}>
                {messages.map((data, index) => {
                  return(
                  <div key={index}  className={`flex ${data.receiverId === userId? 'justify-start' : 'justify-end'} my-2`}>
                    <div className={`p-2 rounded-lg max-w-xs ${data.receiverId === userId ? 'bg-blue-300' : 'bg-gray-200'}`}>
                      <h1>{data.message}</h1>
                    </div>
                  </div>
                  )
                  })}
              </div>
              <div className="h-[10vh] bg-gray-500 flex items-center p-4">
                <Input onChange={(e)=> setInputMessage(e.target.value)} value={inputMessage} placeholder="Basic usage" className="w-full" />
                <button className="chatSubmitButton" onClick={handleSubmit}>
                        Send
                </button>
              </div>
            </div>
          ) : (
            <h1>select people to communicate with them</h1>
          )
        }
        </div>
      </div>
    </>
    )
    }


export default Conversation