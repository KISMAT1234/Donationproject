import { Link } from "react-router-dom";
import React from 'react'
import image from '../image/donate.jpg'

function Nav(){
  return(
    <>
    <div className="">
      <div className=" bg-blue-800 w-[100%] flex justify-between">
          <div>
              <h1 className="">Logo</h1>
          </div>
          <div className="align-center">
            <ul >
              <li className="">
                 <Link to ="/" className="ml-6 text-stone-100 text-4xl font-semibold">Home</Link>
                 <Link to ="/about-page" className="ml-6 text-stone-100 text-4xl font-semibold">About</Link>
                 <Link to ="/achievement" className="ml-6 text-stone-100 text-4xl font-semibold">Achievement</Link>
                 <Link to ="/event" className="ml-6 text-stone-100 text-4xl font-semibold">event</Link>
                 <Link to ="/contact" className="ml-6 text-stone-100 text-4xl font-semibold">contact</Link>
              </li>
            </ul>
          </div>
          <div>
       <img src={image} className="w-[70%] my-[20]"  alt="" />

          </div>
      </div>
     </div> 




    </>

  )

}

export default Nav;
