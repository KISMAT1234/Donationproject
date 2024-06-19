
import React, { useEffect, useState } from "react";
import axiosUrl from "../url/Axiosurl";
import {Link}from "react-router-dom"

function MemberList() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({}); // Initialize users as an empty array
  const token = localStorage.getItem("token") ?? "";

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosUrl.get("/user")
       
        // console.log(response.data.data.username,'console data');
          setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    getUser();
  }, []);

 


  useEffect(() =>{
     console.log('hello')
  },[]);
  // console.log(users, 'users data') // Add token as a dependency to useEffect

  return (
    <>
      <div className=" px-5 py-1 mx-5  shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
        {loading ? (
          <div className="mt-[250px] text-center text-4xl">Loading Member...</div>
        ) : (
          <div className="">
            {
            users && users.map((data, index) => (
              <div className="flex py-10 justify-between border-b-2 border-gray-600" key={index}>
                <div className="w-[40%] md:w-[20%] rounded-[50%]">
                  <img src={data.image}  className="rounded-[50%]" />
                </div>
                <div>{data.username}</div>
                <div>{data.email}</div>
                <div className="">
                  <Link to ={data.slug}>
                     <button className="md:text-2xl bg-green-400 rounded-2xl px-3 py-2 hover:bg-green-600 hover:text-slate-100">
                      Profile
                     </button>
                  </Link>
                        {/* <button
                          onClick={() => onFollow(data._id)}
                          className={`md:text-2xl rounded-2xl px-3 py-2 hover:text-slate-100 ${
                            data.isFollowing ? "bg-red-400 hover:bg-red-600" : "bg-green-400 hover:bg-green-600"
                          }`}
                        >
                          {data.isFollowing ? "Following" : "Follow"}
                        </button> */}
               
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MemberList;

