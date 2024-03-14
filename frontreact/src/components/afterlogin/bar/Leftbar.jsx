import {Link} from "react-router-dom";
function  Leftbar(){

const logOut = () => {
   localStorage.clear()
   window.location.href="/"
}


    return <>
     <div className=" rounded-2xl mt-[20px]   h-[8vh] md:h-[80vh] justify-between flex md:block mx-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="md:mx-[5%] my-3 md:text-4xl md:mt-5px font-bold text-xl hover:text-blue-900 hover:bg-green-400 hover:rounded-2xl px-2">
           <button className="">
              <Link to ="/Mainpage">Content</Link>
           </button>
        </div>
            <div className="md:mx-[5%] my-3 md:text-4xl md:mt-5px font-bold text-xl hover:text-blue-900 hover:bg-green-400 hover:rounded-2xl px-2">
             <button className="">
               <Link to ="/Mainpage/favouriteswe">Favourites</Link>
            </button>
        </div>

        <div className="md:mx-[5%] text-green-500 my-3 md:text-4xl md:mt-5px font-bold text-xl  px-2">
           <button className="">
             <Link to ="/Mainpage/upload" clasnmae="">Upload</Link>
           </button>
        </div>

        <div className="md:mx-[5%] my-3 md:text-4xl md:mt-5px font-bold text-xl hover:text-blue-900 hover:bg-green-400 hover:rounded-2xl px-2">
            <button className="">
               <Link to ="/Mainpage/members-list">Member</Link>
            </button>
        </div>
        <div className="md:mx-[5%] my-3 md:text-4xl md:mt-5px font-bold text-xl hover:text-blue-900 hover:bg-green-400 hover:rounded-2xl px-2">
            <button className="" onClick={logOut}>
               Logout
            </button>
        </div>
         
        </div>
    </>
}

export default Leftbar;