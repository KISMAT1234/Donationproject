import React, { useEffect, useState } from 'react'
import axiosUrl from "../../url/Axiosurl";



const Sidebar = () => {
  const[user, setUser] = useState([])

  useEffect(() => {
     axiosUrl.get('user').then((response)=>{
      console.log(response.data.data);
     }) 
  },[])
    return (
    <>
      <div>Sidebar</div>
      <div>

      </div>
    </>
  )
}

export default Sidebar