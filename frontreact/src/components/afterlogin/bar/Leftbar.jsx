import {Link} from "react-router-dom";
import { FaHome } from "react-icons/fa";


function  Leftbar(){

const logOut = () => {
   localStorage.clear()
   window.location.href="/"
}

const click = () => {
   
}


    return <>
     <div className="bg-gray-200  rounded-2xl mt-[20px]  md:px-5 h-[8vh] md:h-[80vh] justify-between flex md:block mx-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div onClick={click} className=" py-2 md:py-3 md:text-2xl md:mt-5px font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl px-2">
           <button className="">
              <Link to ="/Mainpage" className="flex">
               <FaHome className=" mx-4 text-4xl md:mx-0 md:2xl"/>
               <h1 className="hidden md:block md:ml-2"> Content</h1>
               </Link>
           </button>
        </div>
            <div className=" py-3 md:text-4xl md:mt-5px font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl px-2">
             <button className="">
               <Link to ="/Mainpage/favourites">Favourite</Link>
            </button>
        </div>

        <div className=" text-green-500 py-3 md:text-4xl md:mt-5px font-bold text-md  px-2">
           <button className="">
             <Link to ="/Mainpage/upload" clasnmae="">Upload</Link>
           </button>
        </div>

        <div className=" py-3 md:text-4xl md:mt-5px font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl px-2">
            <button className="">
               <Link to ="/Mainpage/members-list">Member</Link>
            </button>
        </div>
        <div className=" py-3 md:text-4xl md:mt-5px font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl px-2">
            <button className="" onClick={logOut}>
               Logout
            </button>
        </div>
         
        </div>
    </>
}

export default Leftbar;