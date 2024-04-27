import React, { useEffect, useState } from "react";
import axiosUrl from "../url/Axiosurl";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";



const Profile = () => {

    const [profile, setProfile] = useState([]);
    const [post, setPost] = useState([]);
    const [loading, setLodaing] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

  
  useEffect(()=>{
     axiosUrl.get("/login/token").then((response)=>{
       console.log(response.data.userData,'response ');
       setProfile([response.data.userData[0].userId])
       setPost(response.data.userData)
       setLodaing(false)
       
      }).catch((err)=>{
        console.log(err);
      })
      
      //  axiosUrl.get("/upload").then((response)=>{
        //   console.log(response.data.data);
    //   setProfile([response.data.data])
    // }).catch((err)=>{
    //   console.log(err);
    // })
  },[])
  // console.log(profile[0]?.username, "profile value");
  // console.log(post, 'post data')




  return (
    <>
    {
      loading ? (
        <div className="mt-[250px] text-center text-4xl">
           <h1>Loading Profile...</h1>
        </div>
      ) : (
        <>
    <div className="mx-5 my-10 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex justify-between">
       <Link to = {"/Mainpage/profile/" + profile[0]?.slug}>
        <button className="bg-red-600  hover:bg-green-600 rounded-xl px-2 py-1 mx-5 my-5 justify-end">
            {/* <h1>Edit</h1> */}
            <FaEdit className="ml-1 text-4xl" />
        </button>
       </Link>

       <Link to ="">
       <button className="bg-red-600  hover:bg-green-600 rounded-xl px-2 py-1 mx-5 my-5 justify-end">
           <h1>Change password</h1>
         </button>
       </Link>
      </div>

        {
        profile.map((data, index)=>(
            <div key={index} className="">
               <div className="flex justify-center">
                {/* <img src={data.image}/> */}
                <h1>Image</h1>
               </div>
               <div className="flex justify-center text-6xl font-medium">{data.username}</div>
               <div className="flex justify-center text-xl">{data.email}</div>
            </div>
        ))
        }
    </div>
    <div className="mx-5 my-10 ">
       <h1>Post</h1>
       {
        post.map((postData, index)=>{
           return <div key={index} className="mx-5 my-5 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <h1 className="mx-5 my-5">{postData.name}</h1>
                <h1 className="mx-5 my-5">{postData.address}</h1>
                <h1 className="mx-5 my-5">{postData.age}</h1>
                <h1 className="mx-5 my-5">{postData.description}</h1>
                <h1 className="mx-5 my-5">{postData.image}</h1>
           </div>
        })
       }
    </div>
    </>
      )
}
      </>
)
}

export default Profile