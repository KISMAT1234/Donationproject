import logo from "../../image/logo.jpg"


function Topbar() {



   return(
    <>
       <div className="rounded-b-2xl bg-green-400 h-[10vh] flex sm:flex justify-between shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
           
           <div className="w-[100px]">
           <img src={logo} className="  w-[100%]"  alt="" />
           </div>

           <div className="  mt-5 text-[10px] sm:text-[120%] md:text-[150%]">
               <h1 className="">DONATE ANYTHING YOU WANT</h1>
            
           </div>

           <div className="">
              <input type="text" className="mt-2 mr-3 md:mr-10 rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]" placeholder="Search Items Here"/>
              <h1 className="font-mono text-xl">Welcome:</h1>
           </div> 

       </div>
       


    </>
   )
}

export default Topbar;