import Topbar from "./bar/Top";
import Leftbar from "./bar/Leftbar";
import Rightbar from "./bar/Rightbar";
import Centercontent from "./bar/Centercontent"


function  Mainpage(){
  return (
    <>
    <Topbar/>
    <div className="grid  md:grid-cols-3 sm:grid-cols-2 gap-4">
        <div className=" ">
        <Leftbar/>
        </div>
        {/* <div className=" ">
        <Centercontent/>
        </div>
        <div className="">
        <Rightbar/>
        </div> */}
    </div>


    </>
  )
} 

export default Mainpage;
