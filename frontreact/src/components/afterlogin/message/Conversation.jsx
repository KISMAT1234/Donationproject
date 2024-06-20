import React, { useState } from 'react'

const Conversation = () => {
  const[conversation, setConversation] = useState([])
  const[currentChat, setCurrentChat] = useState(null)

  return (
    <>
      { 
       currentChat ? (
        
         <div className="flex flex-col">
           <div className="">
             top user data
           </div>
           <div className="">
             center message
           </div>
           <div className="h-[10vh]">
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