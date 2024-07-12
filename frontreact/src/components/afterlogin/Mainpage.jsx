import React, { useEffect, useState } from "react";
import axiosUrl from "../url/Axiosurl";
import { useDispatch,useSelector } from 'react-redux';
import {fetchUpload} from "../../slices/uploadSlice"
import {jwtDecode} from 'jwt-decode';
import { Star } from "../../slices/addSlice";
import { Link, useSearchParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import { CiSquareRemove } from "react-icons/ci";
import { formatDistanceToNow, format  } from 'date-fns';
import { enUS } from 'date-fns/locale'

import { Pagination } from 'antd';

import { HeartOutlined,HeartFilled } from '@ant-design/icons'
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button,message,Popconfirm,Popover } from 'antd';

import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BiData } from "react-icons/bi";

import InfiniteScroll from 'react-infinite-scroller'


const token = localStorage?.getItem('token');

// Decode the token if it exists
const decodedToken = token ? jwtDecode(token) : null;

// Export the userId if available
export const userId = decodedToken?.id || null;
// console.log(userId,'user token id in donate.jsx')


function Content() {
  const [favourite, setFavourite] = useState({}); 
  // const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();


  const { data, error, isLoading,fetchNextPage,hasNextPage,isFetchingNextPage,isFetching } = useInfiniteQuery({
    queryKey: ['post'],
    queryFn:async({pageParam = 1}) =>{
      console.log(pageParam,'param value')
      const response = await axiosUrl.get(`/upload?page=${pageParam}`)
      console.log(response.data.data,'res')
      return response.data.data
    } ,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage || undefined,
    // placeholderData: keepPreviousData,
    staleTime: 10000,
  });
  console.log(data,'tanstack query data')
  const flattenedData = data?.pages?.flat() || [];
  
  
  const removePost = (postId) => {
      // console.log(postId,'id to remove')
      message.success('removed success');
    }
    const cancel = (e) => {
      console.log(e);
      message.error('Cancelled');
    };
 

    useEffect(() => {
      const getFavourite = async() => {
        try {
           const response = await axiosUrl.get("/favourite");
           console.log(response.data.data.map(fav => fav.postId),'response follower');
           setFavourite(response.data.data.map(fav => fav.postId))
        } catch (err) {
           console.error("Error fetching user follower data:", err);
        }
     }
      getFavourite();
      dispatch(fetchUpload());
    }, []);
    


    const isPostFavourite = (postId) => {
      return favourite.includes(postId);
    };

    const addToCart = async(data, id) => {
      // console.log(data,'data of fav')
  
      try {
      const response = await axiosUrl.post(`/favourite/${id}`);
      console.log(response.data.data,'response follower');
      
    } catch (err) {
      console.error("Error fetching user follower data:", err);
    }
  }
  // console.log(content,'content data')



  const more = (
    <div className=" mx-10 block">
      <Link to="">
          <h1 className="text-xl hover:text-red-600 font-mono my-1">report</h1>
      </Link>

      <Link to="">
          <h1 className="text-xl hover:text-red-600 font-mono my-1">report</h1>
      </Link>

      <Link to="">
          <h1 className="text-xl hover:text-red-600 font-mono my-1">report</h1>
      </Link>

      <Link to="">
          <h1 className="text-xl hover:text-red-600 font-mono my-1">report</h1>
      </Link>
    </div>
  );

  const renderTime = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const daysDifference = Math.floor((now - postDate) / (1000 * 60 * 60 * 24)); // Calculate days difference
  
    let timeAgo;
    if (daysDifference < 10) {
      // Less than 10 days old, show "X days ago"
      timeAgo = formatDistanceToNow(postDate, { addSuffix: true, locale: enUS });
    } else {
      // More than or equal to 10 days old, show date (month and day)
      timeAgo = format(postDate, 'MMMM dd', { locale: enUS });
    }
  
    return timeAgo.replace('about ', ''); // Remove "about" text if present
  };

  // console.log(timeAgo,'time check')


  return (
    <>
        <div className="" >
          <div className="mx-5 flex fixed z-10 top-14 md:justify-between md:top-20 px-2 py-2 md:w-[72%] w-[94%] rounded-2xl  bg-stone-100 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
              <Link to="/Mainpage">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-green-400 hover:bg-indigo-600 hover:text-white border-2 border-indigo-400 hover:border-indigo-800 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">All</h1>
              </div>
              </Link>
      
              <Link to = "/Mainpage/search?category=Accident">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-green-400 hover:bg-indigo-600 hover:text-white border-2 border-indigo-400 hover:border-indigo-800 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Accident</h1>
              </div>
              </Link>
      
                <Link to ="">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-green-400 hover:bg-indigo-600 hover:text-white border-2 border-indigo-400 hover:border-indigo-800 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Disease</h1>
              </div>
              </Link>
        
              <Link to ="">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-green-400 hover:bg-indigo-600 hover:text-white border-2 border-indigo-400 hover:border-indigo-800 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Animal</h1>
              </div>
              </Link>
        
              <Link to ="">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-green-400 hover:bg-indigo-600 hover:text-white border-2 border-indigo-400 hover:border-indigo-800 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Environment</h1>
              </div>
              </Link>
        
              <Link to ="/Mainpage/search?category=Orphange">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-green-400 hover:bg-indigo-600 hover:text-white border-2 border-indigo-400 hover:border-indigo-800 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Orphange</h1>
              </div>
              </Link>

              <Link to ="">
              <div className="ml-1 my-1 px-1 py-1 rounded-2xl bg-green-400 hover:bg-indigo-600 hover:text-white border-2 border-indigo-400 hover:border-indigo-800 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <h1 className="text-sm md:text-xl">Other</h1>
              </div>
              </Link>
            </div>
            <InfiniteScroll 
              loadMore={()=>{
                if(!isFetching){
                  fetchNextPage();
                }
              }}
              // loadMore={fetchNextPage()}
              hasMore={hasNextPage}
            >
              <div className="mt-28 md:mt-20 ">
                {flattenedData.map((data, index) => (
                  <div key={index} className="md:w-[90%]  px-5 py-5 mx-10 my-10 rounded-xl  bg-gray-400 200 border-2 hover:border-green-500 border-gray-200  shadow-md  hover:shadow-lg transform hover:scale-105  transition duration-300 ease-in-out">
                    <div className="flex justify-between">
                      <div className="flex">
                        <div className="w-[10%] md:w-[20%]">
                          <img src={data.userId.image} width="100" className=" rounded-[50%]" />
                        </div>
                        <div className="ml-5 font-extrabold  text-3xl">{data.userId.username}</div>
                        </div> 
                        <div className="text-xl flex"> 
                          <MdAccessTime className="mt-1 text-2xl"/>
                          <h1 className="ml-1">{renderTime(data.createdAt)}</h1>
                        </div>
                        <div className="flex text-2xl">
                          <Popover content={more} trigger="click">
                            <button>
                              <TbDots className="mr-2 hover:text-blue-500"/>
                            </button>
                          </Popover>
                          <Popconfirm
                            title="Remove the task"
                            description="Are you sure to remove this task?"
                            onConfirm={() => removePost(data._id)}
                            onCancel={cancel}
                            icon={
                              <QuestionCircleOutlined
                                style={{
                                  color: 'red',
                                }}
                              />
                            }
                          >
                            <button className=""><CiSquareRemove className="text-4xl  hover:text-red-600 mx-5 my-5"/></button>
                          </Popconfirm>
                      </div>
                    </div>
                    <div className="my-2 text-xl font-light">Name: {data.name}</div>
                    <div className="my-2 text-xl font-light">Address: {data.address}</div>
                    <div className="my-2 text-xl font-normal text-red-600">End Date: {data.endDate}</div>
                    <div className="">
                      <img src={data.image} width="100" className="w-[90%]" alt="image" />
                    </div>
                    <div className="mt-5 flex justify-between">
                      <div>
                        <Link to={"donate/" + data._id}>
                          <button className="bg-green-500 border-2 border-gray-300 hover:border-green-500 hover:bg-indigo-700 hover:text-slate-100  transition duration-300 ease-in-out  h-[50px] text-xl w-[120%] hover:scale-90 rounded-xl">
                            Donate Now
                          </button>
                        </Link>
                      </div>
                      <div>
                       
                        {/* {
                          favourite?.includes(data._id) ? (
                            <button onClick={() => addToCart(data,data._id)}>
                              <HeartFilled style={{ color:'red' }}  className="text-4xl"  />
                            </button>
                          ) : (
                        <button 
                          onClick={()=>addToCart(data, data._id)}
                        >
                          <HeartOutlined  className="text-4xl"  />
                        </button>
                          )
                        } */}
                       <button onClick={() =>  addToCart(data._id)}>
                          {isPostFavourite(data._id) ?  <HeartFilled style={{ color:'red' }} className="text-4xl"/> :   <HeartOutlined  className="text-4xl"/> }
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
            {isFetchingNextPage && <div className="text-4xl mx-10 my-10">Loading..</div>}
            {/* {!hasNextPage && <div className="text-4xl my-5">No more data</div>} */}
        </div>
    </>
  )
}

export default Content
{/* <div className="my-20 flex justify-center">
  <Pagination  current={skip} onChange={onChange} total={50} />
</div> */}



