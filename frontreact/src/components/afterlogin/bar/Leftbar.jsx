import {Link} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";




function  Leftbar(){

const logOut = () => {
   localStorage.clear()
   window.location.href="/"
}




    return <>
     <div className="bg-gray-200  rounded-2xl md:mt-[22px]  md:px-5 h-[8.5vh] md:h-[80vh] justify-between flex md:block mx-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="py-2 md:py-3 md:text-2xl md:mt-5px font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl ">
              <Link to ="/Mainpage" className="flex">
               <FaHome className=" mx-4 text-4xl md:mx-0 md:2xl"/>
               <h1 className="hidden md:block md:ml-2"> Content</h1>
               </Link>
        </div>

         <div className="py-2 md:py-3 md:text-2xl  md:mt-5px font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl ">
               <Link to ="/Mainpage/profile" className="flex">
                  <FaUser className=" mx-4 text-4xl md:mx-0 md:2xl"/>
                  <h1 className="hidden md:block md:ml-2">Profile</h1>
               </Link>
        </div>

         <div className="py-2 md:py-3 md:text-2xl  md:mt-5px font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl ">
              <Link to ="/Mainpage/favourites" className="flex">
               <FaStar className=" mx-4 text-4xl md:mx-0 md:2xl"/>
                 <h1 className="hidden md:block md:ml-2">Favourite</h1>
                 </Link>
         </div>

        <div className=" py-2 md:py-3 md:text-2xl  md:mt-5px font-bold text-md  ">
             <Link to ="/Mainpage/upload" className="flex" >
               <FaUpload className=" mx-4 text-4xl md:mx-0 md:2xl text-green-500"/>
               <h1 className="hidden md:block md:ml-2 text-green-500">Upload</h1></Link>
        </div>

        <div className=" py-2 md:py-3 md:text-2xl  font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl ">
               <Link to ="/Mainpage/members-list" className="flex" >
               <FaUsers className=" mx-4 text-4xl md:mx-0 md:2xl"/>
                  <h1 className="hidden md:block md:ml-2">Member</h1>
               </Link>
        </div>
        <div className=" py-2 md:py-3 md:text-2xl font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl ">
            <button className="flex" onClick={logOut}>
              <FaSignOutAlt className=" mx-4 text-4xl md:mx-0 md:2xl"/>
               <h1 className="hidden md:block md:ml-2">Logout</h1>
            </button>
        </div>
         
        </div>
    </>
}

export default Leftbar;