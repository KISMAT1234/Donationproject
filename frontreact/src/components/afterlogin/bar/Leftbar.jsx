import {Link} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RxTextAlignJustify } from "react-icons/rx";
import { useState } from "react";
import axiosUrl from "../../url/Axiosurl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";






function  Leftbar(){
   const[open, setOpen] = useState(false);

const sidebar = () => {
   setOpen(!open)
}

const {data: highestPaymentDonorsList, isLoading, isError} = useQuery({
   queryKey: 'highestPaymentDonorsList',
   queryFn: async () => {
      try{
         const response = await axiosUrl.get('/donate');
         return response.data.data;
      }catch(error){
         console.log(error,'error in request')
      }
   }
})
console.log(highestPaymentDonorsList,'payent data of highest')






    return <>
         <div>
         {open && (
      <div className="h-[100vh] px-5 py-5 w-[60%] bg-red-600 z-50   md:block absolute transform transition-transform duration-300 ease-in-out ">
        <div className="flex justify-between">
          <a href="#" className="text-xl font-bold md:absolute md:block ">Mystry message</a>
            <button onClick={sidebar}>
              {/* <X className="text-4xl"/> */}
              <h1>X</h1>
            </button>
        </div>
        <div>
        <Link to="/messages">

         <button className="bg-blue-500 px-5 py-5 rounded-xl">
            <h2>Messages</h2>
         </button>
         </Link>

        </div>
     
      </div>
    )}
            <div className="bg-violet-600  rounded-2xl md:mt-[22px]  md:px-5 h-[8.5vh] md:h-[56vh] justify-between flex md:block mx-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
               <div className="py-2 md:py-3 md:text-2xl md:mt-5px font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl ">
                     <Link to ="/Mainpage" className="flex">
                      <FaHome className=" mx-4 text-4xl md:mx-0 md:2xl"/>
                      <h1 className="hidden md:block md:ml-2"> Content</h1>
                      </Link>
               </div>
      
                <div className="py-2 md:py-3 md:text-2xl  md:mt-5px font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl ">
                      <Link to ="/Mainpage/profile" className="flex">
                         <FaUser className=" mx-4 text-4xl md:mx-0 md:2xl"/>
                         <h1 className="hidden md:block md:ml-2">Profile</h1>
                      </Link>
               </div>
      
                <div className="py-2 md:py-3 md:text-2xl  md:mt-5px font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl ">
                     <Link to ="/Mainpage/favourites" className="flex">
                      <FaStar className=" mx-4 text-4xl md:mx-0 md:2xl"/>
                        <h1 className="hidden md:block md:ml-2">Favourite</h1>
                        </Link>
                </div>
      
               <div className=" py-2 md:py-3 md:text-2xl  md:mt-5px font-bold text-md  ">
                    <Link to ="/Mainpage/upload" className="flex" >
                      <FaUpload className=" mx-4 text-4xl md:mx-0 md:2xl text-green-500"/>
                      <h1 className="hidden md:block md:ml-2 text-green-500">Upload</h1></Link>
               </div>
      
               <div className=" py-2 md:py-3 md:text-2xl  font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl ">
                      <Link to ="/Mainpage/members-list" className="flex" >
                      <FaUsers className=" mx-4 text-4xl md:mx-0 md:2xl"/>
                         <h1 className="hidden md:block md:ml-2">Member</h1>
                      </Link>
               </div>
         
               <div className=" py-2 md:py-3 md:text-2xl md:hidden font-bold text-md hover:text-slate-100 hover:bg-green-400 hover:rounded-2xl ">
                   <button className="flex" onClick={sidebar}>
                     <RxTextAlignJustify className=" mx-4 text-4xl md:mx-0 md:2xl"/>
                      <h1 className="hidden md:block md:ml-2">Sidebar</h1>
                   </button>
               </div>
         
            </div>
            <div className="bg-violet-600 h-[28vh] px-4 py-2 mx-4 my-2 rounded-2xl text-white hidden md:block">
               <h1 className="text-2xl text-center text-green-400 font-bold">Top Donors</h1>
                {highestPaymentDonorsList?.length > 0 ? (
                  highestPaymentDonorsList?.map((donor) => (
                     <div key={donor.id} className="flex justify-between">
                        <h1>Image</h1>
                        <h1>{donor.donorId.username}</h1>
                        <h1>${donor.amount}</h1>
                     </div>
                  ))
                ) : (
                  <h1>no donation</h1>
                )}
                
            </div>
         </div>   
               
    </>
}

export default Leftbar;