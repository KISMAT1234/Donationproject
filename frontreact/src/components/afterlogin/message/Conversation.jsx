import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import axiosUrl from '../../url/Axiosurl'

const Conversation = () => {
  const[conversation, setConversation] = useState([])
  const[currentChat, setCurrentChat] = useState(null) 
  const[messages,setMessages ] = useState([])

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
      { 
       !currentChat ? (
        
         <div className="">
           <div className="h-[10vh] bg-yellow-500">
             top user data
           </div>
           <div className="h-[60vh]">
             center message
             {
              messages.map((data,index)=>{
                return(
                  <>
                    <div key={index}>
                      <h1>{data.message}</h1>
                      
                    </div>
                  </>
                )
              })
             }
           </div>
           <div className="h-[10vh] bg-gray-500">
               <div>
                 <Input placeholder="Basic usage" />
               </div>
             footer input field

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