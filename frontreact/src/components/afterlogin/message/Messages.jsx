import React from 'react'
import Conversation from './Conversation';
import Sidebar from './Sidebar';

const Messages = () => {
  return (
    <>
        {/* <div>Messages</div> */}
      <div className=" px-10 py-10">
        {/* <div className="w-[25%] h-[80vh] bg-red-500">
          <Sidebar/>
        </div> */}
        <div className="">
           <Conversation />
        </div>
      </div>
      
    </>
  )
}

export default Messages;


