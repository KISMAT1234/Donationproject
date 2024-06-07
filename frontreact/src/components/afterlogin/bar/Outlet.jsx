import React from 'react'
import Topbar from "./Top";
import Leftbar from "./Leftbar"
import {Outlet} from "react-router-dom";
import  { useState } from "react";
import ads from "../../image/donate.jpg"

const SmallCard = ({ onClose }) => (
  <div  className="h-[70%] w-[80%] mx-[10%] my-[10%] bg-blue-500" style={{position:'absolute', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: '999' }}>
    <span style={{ cursor: 'pointer', float: 'right' }} onClick={onClose}>X</span>
    {/* Your content for the small card goes here */}
    <h1 className="text-2xl my-2 font-bold">Help this children for cancer treatment</h1>
    <img  src={ads} className=""/>
    <p>Need $90000 fro their treatment</p>
    <h3>Please feel free to donate</h3>
  </div>
);




const Layout = () => {

  const [showCard, setShowCard] = useState(true);

  const handleCloseCard = () => {
    setShowCard(false);
  };
  return (
    <>
     {showCard && <SmallCard onClose={handleCloseCard} />}
    <div className="" style={{ filter: showCard ? 'blur(2px)' : 'none' }}>
       <div className="fixed z-50 top-0  hidden md:block w-full">
         <Topbar />
       </div>
   
       <div className="md:flex">
           <div className=" fixed z-50 top-0 md:top-0  z-1000  md:w-[20%]  w-full md:mt-14">
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