import { useState, useEffect } from 'react';
import { useLocation, useParams} from 'react-router-dom';
import axiosUrl from "../url/Axiosurl";
import { useDispatch,useSelector } from 'react-redux';
import {fetchUpload} from "../../slices/uploadSlice"
import { Star } from "../../slices/addSlice";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";

// import { Pagination } from 'antd';




const Search = () => {
    const [search, setSearch] = useState([]);
    const [loading, setLoading] = useState(true)
    // const [category, setCategory] = useState([]);
    // const [current, setCurrent] = useState(1);
    const [clickedIndex, setClickedIndex] = useState(-1); 
    const location = useLocation();
    const dispatch = useDispatch();
    const param = useParams()
    // const onChange = (page) => {
    //     setCurrent(page);
    //   };
    //   console.log(current,'page');


    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('name');
    const categoryQuery = queryParams.get('category');
    // console.log(categoryQuery,'category')

    if(searchQuery){
      const handleSearch = () => {
        axiosUrl.get(`/upload?name=${searchQuery}`).then((response)=>{
            // console.log(response.data.data,'fetch data');
            setSearch(response.data.data)
            setLoading(false)
         }).catch((err)=>{
          console.log(err);
        })
      }
      useEffect(() => {
        handleSearch();
      },[searchQuery])
    }else{
      const categorySearch = () => {
        // console.log('categories search')
        axiosUrl.get(`/category?categoryName=${categoryQuery}`).then((response)=>{
          // console.log(response.data.data,'fetch data');
          setSearch(response.data.data)
          setLoading(false)
       }).catch((err)=>{
        console.log(err);
      })
      }
      useEffect(()=>{
        categorySearch()
      },[categoryQuery])
    }

    const onSubmit = (data, index) => {
       dispatch(Star([data]));
       setClickedIndex(index); // Update the clicked index
     }
     
 return(
    <>
              <div className="mx-5 flex fixed top-14 md:justify-between md:top-20 px-2 py-2 md:w-[72%] w-[94%] rounded-2xl bg-stone-100 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
              <Link to="/Mainpage">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">All</h1>
              </div>
              </Link>
      
              <Link to = "/Mainpage/search?category=Accident">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Accident</h1>
              </div>
              </Link>
      
                <Link to ="">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Disease</h1>
              </div>
              </Link>
        
              <Link to ="">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Animal</h1>
              </div>
              </Link>
        
              <Link to ="">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Environment</h1>
              </div>
              </Link>
        
              <Link to ="/Mainpage/search?category=Orphange">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Orphange</h1>
              </div>
              </Link>

              <Link to ="">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Other</h1>
              </div>
              </Link>
            </div>


     {
       loading ? (
         <h1 className="text-4xl flex justify-center mt-40">Loading...</h1>
          ) : (
            <div className="sm:grid sm:grid-cols-2 md:grid-cols-3">
              {/* <h1>data</h1> */}
          {search && search.map((data, index) => (
            <div key={index} className="md:w-[90%] h-[70vh] px-5  ml-5 mr-5 py-5 mt-20 md:mt-20 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
              <div className="flex">
                 <div className="w-[10%] md:w-[20%]">
                   <img src={data.userId.image} width="100" className=" rounded-[50%]" />
                 </div >
                 <div className="ml-5 font-bold  text-2xl">{data.userId.username}</div>
                 <div> </div>
              </div>
              <div className="my-2">Name: {data.name}</div>
              <div className="my-2">Address: {data.address}</div>
              <div className="my-2">Age: {data.age}</div>
              <div className="my-2">Problem: {data.description}</div>
              <div className="">
                <img src={data.image} width="100" className="w-[90%]" alt="Content" />
              </div>
              <div className="mt-5 flex justify-between">
                <div>
                  <Link to={"donate/" + data._id}>
                    <button className="bg-green-500 h-[45px] text-2xl w-[120%] rounded hover:bg-red-600">
                      Donate Now
                    </button>
                  </Link>
                </div>
                <div>
                  <button onClick={() => onSubmit(data, index)}>
                    <CiStar className="text-4xl" style={{ fill: clickedIndex === index ? 'black' : 'blue', backgroundColor: clickedIndex === index ? 'yellow' : 'transparent' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
           )
        } 
      
    </>
 )
}

export default Search;
// {/* <div className="my-20 flex justify-center">
//      <Pagination current={current} onChange={onChange} total={50} />
// </div> */}