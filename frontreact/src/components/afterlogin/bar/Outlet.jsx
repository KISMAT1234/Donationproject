import React from 'react'
import Topbar from "./Top";
import Leftbar from "./Leftbar"
import {Outlet} from "react-router-dom";


const Layout = () => {
  return (
    <>
    <div className="">
       <div className="fixed z-50 top-0  hidden md:block w-full">
         <Topbar />
       </div>
   
       <div className="md:flex">
           <div className=" fixed top-0 md:top-0  z-1000  md:w-[20%]  w-full md:mt-14">
              <Leftbar/>
           </div>
           <div className=" md:ml-[20%] mt-14 md:w-[100%] md:mt-20">
             <Outlet/>
           </div>
       </div>
     </div>
   
       </>
  )   
}

export default Layout