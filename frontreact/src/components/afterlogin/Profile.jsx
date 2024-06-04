import React, { useEffect, useState } from "react";
import axiosUrl from "../url/Axiosurl";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Button, message, Popconfirm } from 'antd';



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


  const  deletePost = (postId) => {
    try{
       axiosUrl.delete(`/upload/${postId}`).then((response)=>{
         console.log(response.data.data);
         message.error(response.data.data.message);
       }).catch((err)=>{
         console.log(err);
       })
    }
    catch(error){
      console.log(error); 
    }
  }

 
  const cancel = () => {
    message.error('Cancelled');
  };


  return (
    <>
    {
      loading ? (
        <div className="mt-[250px] text-center text-4xl">
           <h1>Loading Profile....</h1>
        </div>
      ) : (
        <>
    <div className="mx-5 my-10 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex justify-between">
       <Link to = {"/Mainpage/profile/" + profile[0]?.slug}>
        <button className="bg-green-500 flex hover:bg-green-700 hover:text-stone-800 rounded-xl px-2 py-1 mx-5 my-5 justify-end">
            {/* <h1>Edit</h1> */}
            <FaEdit className="ml-1 text-4xl" />
            <h1 className="text-4xl">Edit Profile</h1>
        </button>
       </Link>

       <Link to ="">
       <button className="bg-red-500  hover:bg-red-600 text-xl hover:text-slate-200 rounded-xl px-2 py-1 mx-5 my-5 justify-end">
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
       <h1 className="text-4xl font-mono">Post</h1>
       {
        post.map((postData, index)=>{
          return <div key={index} className="pt-1 px-5 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="flex justify-between">
              <div className="w-[70%]">
                <div className="flex flex-wrap justify-between">
                    <h1 className=" my-5">Name: {postData.name}</h1>
                    <h1 className=" my-5">Address: {postData.address}</h1>
                    <h1 className=" my-5">Age {postData.age}</h1>
                </div>
                <div className="">
                    <h1 className=" my-5">Phone: {postData.phone}</h1>
                    <h1 className=" my-5">StartDate: {postData.startDate}</h1>
                    <h1 className=" my-5">EndDate: {postData.endDate}</h1>
                    <h1 className=" my-5">Category: {postData.category}</h1>
                </div>
              </div>
              <div className="ml-50">
                <div>
                  <button onClick={()=> updatePost(postData._id)} className=" px-5 h-10 my-2 rounded-xl bg-green-500  hover:bg-green-600 text-xl hover:text-stone-100 ">Update</button>
                </div>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={ () =>deletePost(postData._id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="Cancel"
                >
                  <button className=" px-5 h-10 my-2  rounded-xl bg-red-500  hover:bg-red-600 text-xl hover:text-stone-100 ">Delete</button>
                </Popconfirm>
                <div>
                  <button  className=" px-5 h-10 my-2 rounded-xl bg-yellow-500  hover:bg-yellow-600 text-xl hover:text-slate-100 ">Private</button>
                </div>
              </div>
            </div>
                <h1 className=" my-5">Description: <br/>{postData.description}</h1>
                <h1 className=" my-5">Image </h1>
            
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