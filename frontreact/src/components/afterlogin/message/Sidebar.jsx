import React, { useEffect, useState } from 'react'
import axiosUrl from "../../url/Axiosurl";



const Sidebar = ({ setCurrentChat}) => {
  const[user, setUser] = useState([])

  useEffect(() => {
     axiosUrl.get('user').then((response)=>{
      // console.log(response.data.data);
      setUser(response.data.data);
     }).catch((error)=>{
      console.log(error);
     }) 
  },[])

  const userClick = (id) => {
    console.log(id,'clicked');
    axiosUrl.get(`user/${id}`).then((response)=>{
      console.log(response.data.data.user,'specific id user');
      setCurrentChat(response.data.data.user);
     }).catch((error)=>{
      console.log(error);
     })

  }
    return (
    <>
      <div>Sidebar</div>
      <div>
         {
          user.map((userList,index)=>{
            return(
              <>
                <button onClick={()=>userClick(userList._id)} className="mx-2 my-4 px-2 py-2  flex justify-between hover:bg-gray-300 ">
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