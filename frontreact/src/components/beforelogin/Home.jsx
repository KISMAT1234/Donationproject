// import React from 'react';
import { Link } from 'react-router-dom';
import Nav from "./Navbar"
import image from './ride.jpg'
function HomePage(){
 return(
   <>
   <Nav/>
    <div>
      <div>
       <img src={image}  alt="" />
       <hr></hr>
        <Link to="/signup-form">
       <button className="hover:bg-orange-600 bg-green-900  w-[70%] h-[10vh] text-3xl text-amber-50 mx-10 mt-4">Signup</button><br></br>
        </Link>
        <Link to ="/login-form">
       <button className="hover:bg-orange-600 bg-green-900  w-[70%] h-[10vh] text-3xl text-amber-50 mx-10 mt-4 ">Login</button>
       </Link>
      </div>
      <hr></hr>
      <div>
         <h1 className="text-7xl text-center mx-10 my-10">DONATE ANYTHING<br></br> FOR POOR <br></br> PEOPLE </h1>
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