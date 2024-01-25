import { Link } from "react-router-dom";
import React from 'react'
function Nav(){
  return(
    <>
    <div className=" bg-blue-800 h-[20vh] w-[100%]">
        <div>
            <h1 className="">Logo</h1>
        </div>
        <div>
          <ul>
            <li>
               {/* <Link to ="/home-page" className="">Home</Link> */}
               {/* <Link to ="/a" className="">About</Link>
               <Link to ="/a" className="">Achievement</Link>
               <Link to ="/a" className="">event</Link>
               <Link to ="/a" className="">contact</Link> */}
            </li>
          </ul>
        </div>
    </div>




    </>

  )

}

export default Nav;
