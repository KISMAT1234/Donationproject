import React, { useEffect, useState } from "react";
import axiosUrl from "../url/Axiosurl";


const Profile = () => {

    const [profile, setProfile] = useState([]);
      const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // You can send the file to the server for storage here
    console.log('Uploading file:', selectedFile);
  };
//   useEffect(()=>{
//      axiosUrl.get("/user").then((response)=>{
//        console.log(response.data.data);
//        setProfile(response.data.data)
//      }).catch((err)=>{
//        console.log(err);
//      })
// },[])



  return (
    <div className="mx-5 my-10  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <h1>Profile</h1>
        {/* {
        profile.map((data, index)=>(
            <div key={index}>
               <div>{data.username}</div>
            </div>
        ))
        } */}


         <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
          </div>


    </div>
  )
}

export default Profile