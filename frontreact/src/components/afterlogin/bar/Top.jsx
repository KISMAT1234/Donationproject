import logo from "../../image/logo.jpg"


function Topbar() {



   return(
    <>
       <div className="bg-green-400 h-[10vh] flex sm:flex justify-between ">
           
           <div className="w-[10%]">
           <img src={logo} className="w-[100%] my-[px] "  alt="" />
           </div>

           <div className=" md:font-thin ">
               <h1 className="">DONATE ANYTHING YOU WANT</h1>
            
           </div>

           <div className="">
              <input type="text" className="mt-2 mr-3 md:mr-10 " placeholder="Search Items Here"/>
              <h1 className="font-mono text-xl">Welcome:</h1>
           </div> 

       </div>
       


    </>
   )
}

export default Topbar;