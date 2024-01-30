import Topbar from "./bar/Top";
import Leftbar from "./bar/Leftbar";
import Rightbar from "./bar/Rightbar";
import Centercontent from "./bar/Centercontent"


function  Mainpage(){
  return (
    <>
    <Topbar/>
    <div className="flex">
        <Leftbar/>
        <Centercontent/>
        <Rightbar/>
    </div>


    </>
  )
} 

export default Mainpage;
