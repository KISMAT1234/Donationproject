import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosUrl from "../url/Axiosurl";
import { useDispatch,useSelector } from 'react-redux';
import {fetchUpload} from "../../slices/uploadSlice"
import { Star } from "../../slices/addSlice";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
// import { Pagination } from 'antd';




const Search = () => {
    const [search, setSearch] = useState([]);
    // const [current, setCurrent] = useState(1);
    const [clickedIndex, setClickedIndex] = useState(-1); 
    const location = useLocation();
    const dispatch = useDispatch();
    // const onChange = (page) => {
    //     setCurrent(page);
    //   };
    //   console.log(current,'page');


    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('name');
    const handleSearch = () => {

          axiosUrl.get(`/upload?name=${query}`).then((response)=>{
              console.log(response.data),'fetch data';
              setSearch(response.data)
           }).catch((err)=>{
            console.log(err);
          })
    }
          useEffect(() => {
            handleSearch();
         },[query])


         const onSubmit = (data, index) => {
            dispatch(Star([data]));
            setClickedIndex(index); // Update the clicked index
          }
 return(
    <>
      {/* <div className="mt-10  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        {
        search.map((data,index)=>(
          <div key={index}>

            <div>{data.name}</div>
          </div>
        ))
        }
      </div> */}


     {
        <div className="sm:grid sm:grid-cols-2 md:grid-cols-3">
          {search.map((data, index) => (
            <div key={index} className="md:w-[90%] h-[70vh] px-5 h-max ml-5 mr-5 py-5 mt-10 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
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
            {/* <div className="my-20 flex justify-center">
                 <Pagination current={current} onChange={onChange} total={50} />
            </div> */}
        </div>
        
      }
      
    </>
 )
}

export default Search;