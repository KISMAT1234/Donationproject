// import React from 'react';
import { Link } from 'react-router-dom';
import Nav from "./Navbar"
import image from '../image/center.jpg'
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
      <div>
        <div className="sm:pl-[10%]">
          <img src={image} classsName=" w-[100%] h-[70vh]"  alt="" />
         </div>
       <hr></hr>
        <Link to="/signup-form">
       <button className="hover:bg-orange-600 bg-green-900  w-[70%] h-[10vh] text-3xl text-amber-50 mx-10 mt-4">Signup</button><br></br>
        </Link>
        <Link to ="/login-form">
       <button className="hover:bg-orange-600 bg-green-900  w-[70%] h-[10vh] text-3xl text-amber-50 mx-10 mt-4 ">Login</button>
       </Link>
      </div>
      <hr></hr>
      <div className="bg-teal-600 hover:bg-violet-600 hover:text-slate-300 sm:h-[100vh] mt-[20px] sm:pt-[95px]">
         <h1 className=" font-bold text-6xl sm:text-9xl text-center ">DONATE ANYTHING<br></br> FOR POOR <br></br> PEOPLE </h1>
      </div>
      <hr></hr>
      <div>
        <h1>kismat</h1>
      </div>
    </div>
   </>

 )
}
export default HomePage;