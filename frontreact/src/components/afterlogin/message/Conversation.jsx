import React, { useEffect, useState,useRef } from 'react'
import { Input } from 'antd';
import axiosUrl from '../../url/Axiosurl'
// import {jwtDecode} from 'jwt-decode';
// import { userId } from '../Mainpage';
import Sidebar from './Sidebar';
import {jwtDecode} from 'jwt-decode';
import { Skeleton } from 'antd';
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { CiCamera } from "react-icons/ci";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { GoPlus } from "react-icons/go";


const Conversation = () => {
  const[user,setUser] = useState([])
  const[conversation, setConversation] = useState([])
  const[currentChat, setCurrentChat] = useState(null) 
  const[loading,setLoading] = useState(false);
  const[selectedUser, setSelectedUser] = useState([]);
  const[messages,setMessages ] = useState([])
  const[inputMessage, setInputMessage] = useState();
  const scrollRef = useRef()
  
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  // console.log(currentChat?._id,'currentchat');

  useEffect(()=>{
    setLoading(true)
    axiosUrl.get(`/message/${currentChat?._id}`).then((response)=>{
        // console.log(response.data.data,'response chat-message data')
        setLoading(false)
        setMessages(response.data.data)
        
    }).catch((error)=>{
      console.log(error)
    })
  },[currentChat])

  useEffect(()=>{
    axiosUrl.get(`/user/${userId}`).then((response)=>{
        // console.log(response.data.data.user,' user fetch data');
        setUser(response.data.data.user)
     }).catch((err)=>{
      console.log(err);
    })
  },[])

  useEffect(()=>{
    axiosUrl.get(`/user/${currentChat?._id}`).then((response)=>{
      console.log(response.data.data.user,' selected user fetch data');
      setSelectedUser(response.data.data.user)
   }).catch((err)=>{
    console.log(err,'error in selected user');
  })
  },[currentChat])

  const sendMessage = async (e) => {
    // e.preventdefault()
    const messageInfo = {
      senderId: userId,
      receiverId: currentChat._id,
      message: inputMessage
    }

    try{
      axiosUrl.post('/message',messageInfo).then((response)=>{
        // console.log(response.data)
        // setMessages([...messages, response.data])
        setInputMessage('')
        // scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }).catch((error)=>{
        console.log(error)
      })
    }catch(err){

    }

  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className="flex px-10 ">
        <div  className="w-[25%]  bg-red-500">

        <Sidebar
            //  onlineUsers={onlineUsers}
            //  currentId={user._id}
             setCurrentChat={setCurrentChat}
        />
        </div>
        <div className="w-[75%] h-[90vh] bg-green-500">
         {currentChat ? (
            <div className="flex flex-col h-screen">
              <div className="h-[10vh] flex justify-between bg-yellow-500 px-5 py-4">
                <div className="flex text-2xl ">
                    <h1>Image</h1>
                    <h1 className="mx-2">{selectedUser.username}</h1>
                </div>
                <div className="text-3xl flex">
                    <IoCallOutline className="mx-2"/>
                    <CiVideoOn className="mx-2"/>
                    <BsThreeDotsVertical className="mx-2"/>
                </div>
              </div>
              <div className="h-[70vh] p-4 overflow-y-auto" >
                {!loading && messages.length > 0 &&
                  messages.map((data, index) => {
                  return(
                  <div key={index}  className={`flex ${data.receiverId === userId? 'justify-start' : 'justify-end'} my-2`}>
                    <div className={`p-2 rounded-lg max-w-xs ${data.receiverId === userId ? 'bg-blue-300' : 'bg-gray-200'}`}>
                      <h1>{data.message}</h1>
                    </div>
                  </div>
                  )
                  })}
                  {loading && [...Array(3)].map((_, idx) => <Skeleton key={idx} />)}
                  {!loading && messages.length === 0 && (
                    <>
			             	  <p className='text-center'>Send a message to start the conversation</p>
                    </>
		            	)}
                  <div ref={scrollRef}></div>
              </div>
              <div className="h-[10vh] bg-gray-500 flex items-center ">
                <GoPlus className="text-4xl mx-2"/>
                <Input onChange={(e)=> setInputMessage(e.target.value)} value={inputMessage} placeholder="Basic usage" className="w-full" />
                <button className="chatSubmitButton " onClick={sendMessage}>
                  <IoMdSend className="text-4xl  "/>
                </button>
                <CiCamera className="text-4xl mx-2"/>
                <MdOutlineKeyboardVoice className="text-4xl mx-2"/>
              </div>
            </div>
          ) : (
            <>
            <p>welcome {user.username}</p>
            <h1>select people to communicate with them</h1>
            </>
          )
        }
        </div>
      </div>
    </>
    )
    }


export default Conversation