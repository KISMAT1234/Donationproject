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
        <div className=" fixed top-10 md:top-0 w-full z-1000  md:w-[20%]   md:mt-14">
           <Leftbar/>
        </div>
        <div className=" md:ml-[20%] mt-28 md:mt-10">
          <Outlet/>
        </div>
    </div>

    </>
  )
}

export default Layout