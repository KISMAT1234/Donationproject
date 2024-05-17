import React from 'react'
import Topbar from "./Top";
import Leftbar from "./Leftbar"
import Category from './Category';
import {Outlet} from "react-router-dom";


const Layout = () => {
  return (
    <>
    <div className="">
       <div className="fixed top-0  hidden md:block w-full">
         <Topbar />
       </div>
   
       <div className="md:flex">
           <div className=" fixed top-0 md:top-0  z-1000  md:w-[20%]  w-full md:mt-14">
              <Leftbar/>
           </div>
           <div className="fixed mx-5 z-0 top-0 w-[90%] md:mt-20 md:w-[76%] md:ml-[20%] mt-14 ">
             <Category/>
           </div>
           <div className=" md:ml-[20%] mt-28 md:w-[100%] md:mt-32">
             <Outlet/>
           </div>
       </div>
     </div>
   
       </>
  )   
}

export default Layout