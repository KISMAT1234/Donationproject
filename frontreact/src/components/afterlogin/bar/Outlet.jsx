import React from 'react'
import Topbar from "./Top";
import Leftbar from "./Leftbar"
import {Outlet} from "react-router-dom";


const Layout = () => {
  return (
    <>
    <div className="fixed top-0  w-full">
      <Topbar />
    </div>

    <div className="md:flex">
        <div className=" fixed top-14 md:top-0  z-1000  md:w-[20%]  w-full md:mt-14">
           <Leftbar/>
        </div>
        <div className=" md:ml-[20%] mt-40 md:w-[100%] md:mt-20">
          <Outlet/>
        </div>
    </div>

    </>
  )
}

export default Layout