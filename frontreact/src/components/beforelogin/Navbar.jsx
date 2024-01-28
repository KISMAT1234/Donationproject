import { Link } from "react-router-dom";
import React from 'react'
function Nav(){
  return(
    <>
    <div className=" bg-blue-800 h-[20vh] w-[100%] flex">
        <div>
            <h1 className="">Logo</h1>
        </div>
        <div>
          <ul>
            <li className="align-center">
               <Link to ="/" className="ml-6 text-stone-100 text-4xl font-semibold">Home</Link>
               <Link to ="/about-page" className="ml-6 text-stone-100 text-4xl font-semibold">About</Link>
               <Link to ="/achievement" className="ml-6 text-stone-100 text-4xl font-semibold">Achievement</Link>
               <Link to ="/event" className="ml-6 text-stone-100 text-4xl font-semibold">event</Link>
               <Link to ="/contact" className="ml-6 text-stone-100 text-4xl font-semibold">contact</Link>
            </li>
          </ul>
        </div>
    </div>




    </>

  )

}

export default Nav;
