import {Link} from "react-router-dom";
function  Leftbar(){
    return <>
     <div className=" rounded-2xl border-2 mt-[20px]  border-red-500 h-[8vh] sm:h-[80vh] justify-between flex sm:block">
        <div className="sm:mx-[5%] my-3 sm:text-4xl sm:mt-5px font-bold text-xl hover:text-blue-900 ">
           <button className="">
              <Link to ="/Mainpage/content">Content</Link>
           </button>
        </div>
            <div className="sm:mx-[5%] my-3 sm:text-4xl sm:mt-5px font-bold text-xl hover:text-blue-900 ">
             <button className="">
               <Link to ="/">Category</Link>
            </button>
        </div>

        <div className="sm:mx-[5%] text-green-500 my-3 sm:text-4xl sm:mt-5px font-bold text-xl  ">
           <button className="">
             <Link to ="/Mainpage/upload" clasnmae="">Upload</Link>
           </button>
        </div>

        <div className="sm:mx-[5%] my-3 sm:text-4xl sm:mt-5px font-bold text-xl hover:text-blue-900 ">
            <button className="">
               <Link to ="/Mainpage/members-list">Member</Link>
            </button>
        </div>
        <div className="sm:mx-[5%] md:hidden my-3 sm:text-4xl sm:mt-5px font-bold text-xl hover:text-blue-900 ">
            <button className="">
               <Link to ="/">Rightbar</Link>
            </button>
        </div>
         
        </div>
    </>
}

export default Leftbar;