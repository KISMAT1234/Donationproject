import { Link } from "react-router-dom";
import React from 'react'
import image from '../image/donate.jpg'
import logo from '../image/logo.jpg'

function Nav(){
  return(
    <>
    <div className="">
      <div className=" bg-yellow-600 w-[100%] flex justify-between">
          <div className="w-[10%]">
          <img src={logo} className="w-[100%] my-[20px] "  alt="" />
          </div>
          <div className="align-center pt-[25px]">
            <ul >
              <li className="">
                 <Link to ="/" className="ml-6 text-stone-100 text-4xl        hover:underline decoration-red-600 font-semibold">Home</Link>
                 <Link to ="/about-page" className="ml-6 text-stone-100       hover:underline decoration-red-600 text-4xl font-semibold">About</Link>
                 <Link to ="/achievement" className="ml-6 text-stone-100      hover:underline decoration-red-600 text-4xl font-semibold">Achievement</Link>
                 <Link to ="/event" className="ml-6 text-stone-100 text-4xl   hover:underline decoration-red-600 font-semibold">event</Link>
                 <Link to ="/contact" className="ml-6 text-stone-100 text-4xl hover:underline decoration-red-600 font-semibold">contact</Link>
              </li>
            </ul>
          </div>
          <div className="sm:p-[10px] pl-[30px] flex justify-between">
            <h1></h1>
             <img src={image} className="w-[50%]  my-[20]"  alt="" />

          </div>
      </div>
     </div> 




    </>

  )

}

export default Nav;
