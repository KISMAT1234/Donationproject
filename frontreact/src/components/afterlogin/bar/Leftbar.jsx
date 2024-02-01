import {Link} from "react-router-dom";
function  Leftbar(){
    return <>
     <div className=" rounded-2xl border-2  border-red-500 h-[8vh] sm:h-[80vh] justify-between flex sm:block">
        <div className="sm:mx-[5%] my-3 sm:text-4xl sm:mt-5px">
           <button className="">
              <Link to ="/">Items</Link>
           </button>
        </div>
            <div className="sm:mx-[5%] my-3 sm:text-4xl sm:mt-5px">
             <button className="">
               <Link to ="/">Items</Link>
            </button>
        </div>

        <div className="sm:mx-[5%] my-3 sm:text-4xl sm:mt-5px">
           <button className="">
             <Link to ="/">Items</Link>
           </button>
        </div>

        <div className="sm:mx-[5%] my-3 sm:text-4xl sm:mt-5px">
            <button className="">
               <Link to ="/">Items</Link>
            </button>
        </div>
        <div className="sm:mx-[5%] my-3 sm:text-4xl sm:mt-5px">
            <button className="">
               <Link to ="/">Rightbar</Link>
            </button>
        </div>
         
        </div>
    </>
}

export default Leftbar;