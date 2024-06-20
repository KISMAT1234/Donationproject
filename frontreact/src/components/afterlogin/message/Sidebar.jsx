import React, { useEffect, useState } from 'react'
import axiosUrl from "../../url/Axiosurl";



const Sidebar = () => {
  const[user, setUser] = useState([])

  useEffect(() => {
     axiosUrl.get('user').then((response)=>{
      console.log(response.data.data);
      setUser(response.data.data);
     }) 
  },[])

  const userClick = () => {
    console.log('clicked');
  }
    return (
    <>
      <div>Sidebar</div>
      <div>
         {
          user.map((userList)=>{
            return(
              <>
                <button onClick={userClick()} className="mx-2 my-4 px-2 py-2  flex justify-between hover:bg-gray-300 ">
                  <div className="flex md:text-4xl">
                    <h1>Image</h1>
                    <h1 className="mx-2 text-xl font-light">{userList.username}</h1>
                  </div>
                  <h1>...</h1>
                </button>
              </>
            )
          })
         }
      </div>
    </>
  )
}

export default Sidebar