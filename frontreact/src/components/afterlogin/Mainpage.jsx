import Topbar from "./bar/Top";
import Leftbar from "./bar/Leftbar";
import Rightbar from "./bar/Rightbar";
import Centercontent from "./bar/Centercontent"


function  Mainpage(){
  return (
    <>
    <Topbar/>
    <div className="sm:flex sm:flex-wrap">
        <div className="hidden sm:block">
        <Leftbar/>
        </div>
        <div className="">
        <Centercontent/>
        </div>
        <div className="hidden sm:block">
        <Rightbar/>
        </div>
    </div>


    </>
  )
} 

export default Mainpage;
