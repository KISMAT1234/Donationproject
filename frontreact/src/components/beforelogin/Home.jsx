// import React from 'react';
import { Link } from 'react-router-dom';
import Nav from "./Navbar"
import image from '../image/donate.jpg'
import axios from 'axios';


function HomePage(){
    axios.get('http://localhost:8000/user').then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  
 return(
   <>
   <Nav/>
   <div>
    <div className="flex">
        <div className="">
          <img src={image} classsName=" w-[1%] h-[100vh]"  alt="" />
         </div>
         <div className="ml-10">
          <img src={image} classsName=" w-[1%] h-[100vh]"  alt="" />
         </div>
         <div className="ml-10">
          <img src={image} classsName=" w-[1%] h-[100vh]"  alt="" />
         </div>
       <hr></hr>
    </div>
    <hr></hr>
    <div className="bg-teal-600 hover:bg-violet-600 hover:text-slate-300 sm:h-[100vh] mt-[20px] sm:pt-[95px]">
       <h1 className=" font-bold text-6xl sm:text-9xl text-center ">DONATE ANYTHING<br></br> FOR POOR <br></br> PEOPLE </h1>
    </div>
    <hr></hr>
      
      <div className="mt-10">
           <iframe width="1365" height="700" src="https://www.youtube.com/embed/TfY-VdwUwoA" title="Renters inside and homeless outside shiver in subzero temperatures" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>



</div>
   </>

 )
}
export default HomePage;