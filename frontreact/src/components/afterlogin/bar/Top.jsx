import { useEffect, useState, useRef} from "react";
import logo from "../../image/logo.jpg"
import { FaSearch } from "react-icons/fa";
import axiosUrl from "../../url/Axiosurl";
// import { Link } from 'react-router-dom';
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";

import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";


const  searchHistory =  async() => {
  const response = await axiosUrl.get(`/search`)
  console.log(response,'response of search')
  return response.data.data
}

const fetchDataBasedOnSearch = async (search) => {
  console.log(search,'inside search')
  const response = await axiosUrl.get(`/search/${search}`);
  console.log(response, "response of search based on click");
  return response.data.data;
};

function Topbar() {
   const [search,setSearch] = useState("");
   const [showSearchContainer,setShowSearchContainer] = useState(false)
   const [highlightedIndex, setHighlightedIndex] = useState(-1);
   const queryClient =  useQueryClient()
   const containerRef = useRef(null); 
   const debouncedSearchValue = useDebounce(search, 500) 

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
      queryFn: searchHistory,
      enabled: showSearchContainer
   })
   console.log(data,'search fetched value')

   const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useQuery({   
    queryKey: ['search',debouncedSearchValue],
    queryFn: () => fetchDataBasedOnSearch(debouncedSearchValue),
    enabled: !!debouncedSearchValue,
  });

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const { mutate:createSearchMutation,loading,err} = useMutation({
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
      createSearchMutation(search);
    }
  
    const handleSearchItemClick = (value) => {
      if(value == ""){
        alert("please provide a search value")
      }else{
        setSearch(value);
        setShowSearchContainer(false);
      }
    };

    const handleKeyDown = (e) => {
      if (data && data.length > 0) {
        if (e.key === "ArrowDown") {
          setHighlightedIndex((prevIndex) => (prevIndex + 1) % data.length);
        } else if (e.key === "ArrowUp") {
          setHighlightedIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
        } else if (e.key === "Enter") {
          if (highlightedIndex >= 0 && highlightedIndex < data.length) {
            handleSearchItemClick(data[highlightedIndex].search);
          }
        }
      }
    };

    const { mutate: deleteMutation } = useMutation({
      mutationFn: (id) => axiosUrl.delete(`/search/${id}`),
      onSuccess: async(deletedItem) => {
        console.log("Search history item deleted successfully");
        // searchData((prevData) =>
        //   prevData.filter((item) => item._id !== deletedItem._id)
        // );
        await queryClient.invalidateQueries({queryKey:['search']})
      },
      onError: (err) => {
        console.error("Error deleting search history item:", err);
      },
    });

 
    const deleteSearchHistory = (e,id) => {
      // e.stopPropagation();
      deleteMutation(id);
      console.log(id)
    }
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
                  <input type="text" 
                    value={search} 
                    onChange={(e)=>setSearch(e.target.value)} 
                    onClick={handleInputClick} 
                    onKeyDown={handleKeyDown}
                    className="w-[500px] placeholder-yellow-600::placeholder bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-black focus:ring-2 focus:ring-purple-600 focus:outline-none focus:border-transparent  py-1 px-2 rounded-lg shadow-lg border-none transform transition-transform duration-300 focus:scale-105" placeholder="Search fund raiser Here"
                  /> 
                </div>
                <div>  
                  <button type="submit" className="bg-blue-400 h-[7vh] hover:bg-blue-600 rounded-md mx-4 transition duration-300 ease-in-out">
                  <FaSearch className="hover:scale-150 w-12"/>
                  </button>
               </div> 
              </div> 
           </form>


                 {showSearchContainer && (
                  <div
                    ref={containerRef}
                    className="container text-white w-[100%] z-20 bg-gray-600 border border-gray-800 h-[60vh] shadow-md p-4 rounded-md animate-fadeIn"
                  >
                    {searchData && searchData.length > 0 ? (
                      searchData.slice(0, 10).map((value, index) => (
                        <div
                          key={index}
                          onClick={() => handleSearchItemClick(value.search)}
                          className={`px-2 flex justify-between hover:text-black py-2 text-2xl font-normal cursor-pointer hover:bg-gray-200 rounded-2xl ${
                            index === highlightedIndex ? "bg-gray-300" : ""
                          }`}
                        >
                          <div className="">
                            <h1>{value.username}</h1>
                          </div>
                        </div>
                      ))
                    ) : (
                      data &&
                      data.slice(0, 10).map((value, index) => (
                        <>
                          <div className="flex justify-between">
                            <div
                              key={index}
                              onClick={() => handleSearchItemClick(value.search)}
                              className={`px-2 w-[90%] flex justify-between hover:text-black py-2 text-2xl font-normal cursor-pointer hover:bg-gray-200 rounded-2xl ${
                                index === highlightedIndex ? "bg-gray-300" : ""
                              }`}
                            >
                              <div className="flex">
                                <h1 className="mt-2 mx-2">
                                  <MdHistory />
                                </h1>
                                <h1>{value.search}</h1>
                              </div>
                            </div>
                            <div>
                              <button className="mt-2 text-4xl hover:text-red-500" onClick={(e)=>deleteSearchHistory(e,value._id)}>
                                <CiCircleRemove />
                              </button>
                            </div>
                          </div>
                        </>
                      ))
                    )}
                  </div>
                )}   
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