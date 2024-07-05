import { useEffect, useState, useRef} from "react";
import logo from "../../image/logo.jpg"
import { FaSearch } from "react-icons/fa";
import axiosUrl from "../../url/Axiosurl";
// import { Link } from 'react-router-dom';
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";


const  searchFunction = async(search) => {
  const response = await axiosUrl.get(`/upload?name=${search}`)
  console.log(response,'response')
  return response.data.data
}


function Topbar() {

   const [search,setSearch] = useState();
   const [showSearchContainer,setShowSearchContainer] = useState(false)
   const containerRef = useRef(null);   // useRef lets you reference a value that’s not needed for rendering.

   const handleInputClick = () => {
      setShowSearchContainer(true);
    };
  
  
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSearchContainer(false);
      }
    };

    const logOut = () => {
      localStorage.clear();
      window.location.href = "/login-form";
    }


   const {data,error,isLoading} = useQuery({
      queryKey: ['search'],
      queryFn: searchFunction,
   })
   console.log(data,'data in tanstack')


    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const { mutate } = useMutation({
      mutationFn: (search) =>axiosUrl.post("/search",{search:search}),
      onSuccess: () => {
        console.log('Data sent to backend successfully');
        window.location.href =`/Mainpage/search?name=${search}`;
      },
      onError: (err) => {
        console.error('Error sending data to backend:', err);
      },
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      mutate(search);
    }
    //  const response = await axiosUrl.post("/search",{search:search});
    //  setApi(response.data.data);
    //  console.log(response);


   return(
    <>
       <div className="rounded-b-2xl bg-green-400 h-[11vh] flex sm:flex justify-between shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
           <div className="w-[100px]">
           <img src={logo} className="  w-[100%]"  alt="" />
           </div>

           <div className="  mt-4 text-[10px] sm:text-[120%] md:text-[150%]">
               {/* <h1 className="">DONATE ANYTHING YOU WANT</h1> */}
               <form onSubmit={handleSubmit}>
             <div className=" md:w-[30%] flex">  
              <div className="">
                  <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} onClick={handleInputClick} className="w-[500px] placeholder-yellow-600::placeholder bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-black focus:ring-2 focus:ring-purple-600 focus:outline-none focus:border-transparent  py-1 px-2 rounded-lg shadow-lg border-none transform transition-transform duration-300 focus:scale-105" placeholder="Search fund raiser Here"/> 
                {showSearchContainer && (
                  <div ref={containerRef} className="container w-[100%] z-20  bg-white border border-gray-800 h-[60vh] shadow-md p-4 rounded-md animate-fadeIn">
                     <h1>kismat</h1>
                  { 
                     data.slice(0, 10).map((search, index)=>{
                        return(
                           <div key={index} >
                              <h1 className="px-2 py-2 text-2xl font-extralight  hover:bg-gray-200 rounded-2xl">{search.name}</h1>
                           </div>
                        )
                     })
                  } 
                </div>
                )}
                {/* <div className="h-[40vh] w-[100%] bg-gray-200 z-1">
                    <h1>This is suggestion div</h1>
                </div> */}
              </div>  
              {/* <Link to={`/Mainpage/search?name=${search}`}>
                <button type = "submit" className=" bg-blue-400  h-[6vh] mt-2 rounded-2xl mx-1 px-4 py-4 ">
                  <FaSearch />
                 </button>
               </Link> */}
                    {/* <Link to={`/Mainpage/search?name=${search}`}> */}
                        <button type="submit" className="bg-blue-400 h-[7vh] hover:bg-blue-600 rounded-md mx-4 transition duration-300 ease-in-out">
                            <FaSearch className="hover:scale-150 w-12"/>
                        </button>
                    {/* </Link> */}
           </div> 
           </form>
            
           </div>
           <div className="flex px-5 py-3">
            <div className="text-3xl mx-2 mt-2 hover:text-blue-600">
             <Link to="/Mainpage/messages">
                   <FaFacebookMessenger/>
              </Link>
            </div>

              <div className="text-3xl mx-2 mt-2 hover:text-red-600">
                <Link to="/Mainpage/notification">
                  <IoIosNotificationsOutline />
                </Link>
              </div>
              <div className="text-3xl mx-3 mt-2 hover:text-green-700">
                <Link to="/Mainpage/payment-details">
                   {/* <h1>Pay</h1> */}
                   <FaMoneyCheckAlt/>
                </Link>
              </div>
              <div className="text-xl px-2 py-2 border border-green-600 font-bold text-md hover:bg-indigo-600 hover:text-slate-100 rounded-2xl ">
                <button className="flex" onClick={logOut}>
                  <FaSignOutAlt className=" mx-4 text-4xl md:mx-0 md:2xl"/>
                   <h1 className="hidden md:block md:ml-2">Logout</h1>
                </button>
              </div>
            </div>
       </div>
    </>
   )
}

export default Topbar;