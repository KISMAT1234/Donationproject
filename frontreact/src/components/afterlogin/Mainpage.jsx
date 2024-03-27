

import React, { useEffect, useState } from "react";
import axiosUrl from "../url/Axiosurl";
import { useDispatch,useSelector } from 'react-redux';
import {fetchUpload} from "../../slices/uploadSlice"
import { Star } from "../../slices/addSlice";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";

function Content() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(-1); // Track which icon is clicked

  // const dispatch = useDispatch();
  // const { data, loading, error } = useSelector((state) => state);
  // const data = useSelector((state)=> state.users);
  // console.log(data,'data')
  // useEffect(() => {
  //   // Dispatch an action to fetch the data when the component mounts
  //   dispatch(fetchUpload());
  // }, []);



  // console.log(state);

  useEffect(() => {
    const getContent = async () => {
      axiosUrl.get("/upload")
        .then((response) => {
          console.log(response.data)
          setContent(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getContent();
  }, []);

  const onSubmit = (data, index) => {
    dispatch(Star([data]));
    setClickedIndex(index); // Update the clicked index
  }

  return (
    <>
      {loading ? (
        <div>Loading content...</div>
      ) : (
        <div className="sm:grid sm:grid-cols-2 md:grid-cols-3">
          {content.map((data, index) => (
            <div key={index} className="md:w-[90%] h-[70vh] px-5 h-max ml-5 mr-5 py-5 mt-10 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
              <div className="flex">
                 <div>
                   <img src={data.userId.image} width="100" className="w-[20%] " />
                 </div >
                 <div className="ml-10 font-bold  text-2xl">{data.userId.username}</div>
              </div>
              <div>{data.name}</div>
              <div>{data.address}</div>
              <div>{data.age}</div>
              <div>{data.description}</div>
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
      )}



      {/* <button className="mt-10 text-4xl bg-red-500" onClick={e => dispatch(fetchUpload())}>fetch</button> */}
      {/* {
        state && state.map((item)=>(
          <div>{item.address}</div>
        ))
      } */}
    </>
  )
}

export default Content;

