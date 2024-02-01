import logo from "./logo.jpg"

function Topbar() {
   return(
    <>
       <div className="bg-green-400 h-[10vh]  sm:flex sm:justify-between ">
           
           <div className="hidden sm:block">
           <img src={logo} className="w-[30%] my-[20px] "  alt="" />
           </div>

           <div className="text-4xl">
               <h1 className="">DONATE CLOTHES SAVELIFE</h1>
            
           </div>

           <div className="hidden sm:block">
              <input type="text" className="" placeholder="Search Items Here"/>
           </div> 

       </div>
       


    </>
   )
}

export default Topbar;