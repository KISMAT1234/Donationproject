import React, { useEffect, useState } from "react";
import axiosUrl from "../url/Axiosurl";


const Profile = () => {

    const [profile, setProfile] = useState([]);
  useEffect(()=>{
     axiosUrl.get("/user").then((response)=>{
       console.log(response.data.data);
       setProfile([response.data.data])
     }).catch((err)=>{
       console.log(err);
     })
},[])

  return (
    <div className="mx-5 my-10  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <h1>Profile</h1>
        {
        profile.map((data, index)=>(
            <div key={index}>
               <div>{data.username}</div>
            </div>
        ))
        }
    </div>
  )
}

export default Profile