import { useEffect, useState, useRef} from "react";
import logo from "../../image/logo.jpg"
import { FaSearch } from "react-icons/fa";
import axiosUrl from "../../url/Axiosurl";
// import { Link } from 'react-router-dom';
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";


function Topbar() {

   const [search,setSearch] = useState();
   const [showSearchContainer,setShowSearchContainer] = useState(false)
   const [api, setApi] = useState([]);
   const containerRef = useRef(null);   // useRef lets you reference a value that’s not needed for rendering.

   const changeValue = (e) => {
      setSearch(e.target.value);
  }

   const handleInputClick = () => {
      setShowSearchContainer(true);
    };

  
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSearchContainer(false);
      }
    };



useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axiosUrl.get(`/upload?name=${search}`);
       setApi(response.data.data);
     } catch (err) {
       console.log(err);
     }
   };

   if (search !== "") {
     fetchData();
   }
 }, [search]);



    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

   

   const handleSubmit = async (e) => {
      e.preventDefault();
    //   if (search.trim() === '') {
    //      // Reload the page or handle the empty search case
    //      window.location.reload();
    //  } else {
       const searchData = new FormData()
       searchData.append('data', search);
    //   //  const searchData = new FormData(e.target);
       console.log(searchData,'search form')
       try {
        //  const response = await axiosUrl.post("/search",searchData);
         // setApi(response.data.data);
        //  console.log(response);
        } catch (err) {
          console.log(err);
        }
       window.location.href = `/Mainpage/search?name=${search}`;
    //  }
    //  console.log(search,'search value')

    //  const formData = new FormData();
    //  formData.append('search', search);
 



      // setSearch('');
     
    
   }

   // console.log(search, 'search value');
  

   return(
    <>
       <div className="rounded-b-2xl bg-green-400 h-[12vh] flex sm:flex justify-between shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
           
           <div className="w-[100px]">
           <img src={logo} className="  w-[100%]"  alt="" />
           </div>

           <div className="  mt-5 text-[10px] sm:text-[120%] md:text-[150%]">
               {/* <h1 className="">DONATE ANYTHING YOU WANT</h1> */}
               <form onSubmit={handleSubmit}>
             <div className=" md:w-[30%] flex">  
              <div className="">
                  <input type="text" value={search} onChange={changeValue} onClick={handleInputClick} className="w-[500px] placeholder-yellow-600::placeholder bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-black focus:ring-2 focus:ring-purple-600 focus:outline-none focus:border-transparent  py-1 px-2 rounded-lg shadow-lg border-none transform transition-transform duration-300 focus:scale-105" placeholder="Search fund raiser Here"/> 
                {showSearchContainer && (
                  <div ref={containerRef} className="container w-[100%] z-20  bg-white border border-gray-800 h-[60vh] shadow-md p-4 rounded-md animate-fadeIn">
                     <h1>kismat</h1>
                  { 
                     api.slice(0, 10).map((search, index)=>{
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
           <div className="text-4xl">
              <Link to="/Mainpage/notification">

              <IoIosNotificationsOutline />
              </Link>
           </div>
    

       </div>
       


    </>
   )
}

export default Topbar;