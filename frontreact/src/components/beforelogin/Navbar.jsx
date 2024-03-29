import { Link } from "react-router-dom";
import React from 'react'
import logo from '../image/logo.jpg'

function Nav(){
  return(
    <>
  <div className="">
        <div className=" bg-yellow-600 w-[100%] md:flex justify-around">
  
            <div className="w-[100px]">
               <img src={logo} className="w-[100%]  my-[20]"  alt="" />
  
            </div>

            <div className="align-center md:pt-[25px] mr-10">
              <ul >
                <li className="flex">
                   <Link to ="/" className="ml-6 text-stone-100 md:text-4xl text-xl        hover:underline decoration-red-600 font-semibold">Home</Link>
                   <button to ="/" className="ml-6 text-stone-100       hover:underline decoration-red-600 md:text-4xl text-xl font-semibold">About</button>
                   <button to ="/achievement" className="ml-6 text-stone-100      hover:underline decoration-red-600 md:text-4xl text-xl font-semibold">Achievement</button>
                   <button to  className="ml-6 text-stone-100 md:text-4xl text-xl   hover:underline decoration-red-600 font-semibold">event</button>
                   <Link to="/contact">
                   <button className="ml-6 text-stone-100 md:text-4xl text-xl hover:underline decoration-red-600 font-semibold">contact</button>
                   </Link>
                </li>
              </ul>
            </div>
     
            <div className="w-[10%] flex mr-40">
                <Link to ="/login-form">
                     <button className="hover:bg-orange-600 bg-green-900 rounded-xl w-[100%] h-[10vh] text-3xl text-amber-50 ml-10 mt-4 ">Login</button>
                 </Link>
                 <Link to="/signup-form">
                         <button className="hover:bg-orange-600 bg-green-900 rounded-xl  w-[70%] h-[10vh] text-3xl text-amber-50 ml-14  mt-4">Signup</button><br></br>
                  </Link>
            </div>
        </div>
       </div> 
  




    </>

  )

}

export default Nav;
