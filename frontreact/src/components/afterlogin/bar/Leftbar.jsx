import {Link} from "react-router-dom";
function  Leftbar(){

const logOut = () => {
   localStorage.clear()
   window.location.href="/"
}


    return <>
     <div className=" rounded-2xl border-2 md:w-[15%] mt-[20px]  border-red-500 h-[8vh] md:h-[80vh] justify-between flex md:block mx-5">
        <div className="md:mx-[5%] my-3 md:text-4xl md:mt-5px font-bold text-xl hover:text-blue-900 ">
           <button className="">
              <Link to ="/Mainpage">Content</Link>
           </button>
        </div>
            <div className="md:mx-[5%] my-3 md:text-4xl md:mt-5px font-bold text-xl hover:text-blue-900 ">
             <button className="">
               <Link to ="/category">Category</Link>
            </button>
        </div>

        <div className="md:mx-[5%] text-green-500 my-3 md:text-4xl md:mt-5px font-bold text-xl  ">
           <button className="">
             <Link to ="/Mainpage/upload" clasnmae="">Upload</Link>
           </button>
        </div>

        <div className="md:mx-[5%] my-3 md:text-4xl md:mt-5px font-bold text-xl hover:text-blue-900 ">
            <button className="">
               <Link to ="/Mainpage/members-list">Member</Link>
            </button>
        </div>
        <div className="md:mx-[5%] my-3 md:text-4xl md:mt-5px font-bold text-xl hover:text-blue-900 ">
            <button className="" onClick={logOut}>
               Logout
            </button>
        </div>
         
        </div>
    </>
}

export default Leftbar;