import React, { useEffect, useState,Suspense,startTransition } from "react";
import axiosUrl from "../url/Axiosurl";
import {Link}from "react-router-dom"
import { useQuery,useLazyQuery,useSuspenseQuery} from '@apollo/client';
// import { useQuery } from "@tanstack/react-query";
import { GET_USERS } from "../../graphql/queries/userQuery";
import { NetworkStatus } from '@apollo/client';

function MemberList() {
  // const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({}); 
  const token = localStorage.getItem("token") ?? "";

  const  {loading,error, data, refetch, networkStatus } = useSuspenseQuery(GET_USERS,{
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',

  });
  console.log(data,'graphql user data')

  if (networkStatus === NetworkStatus.refetch) return <p>Refetching</p>;

  // if (loading) return null;

  if (error) return `Error! ${error}`;

  return (
    <>
      <div className=" px-5 py-1 mx-5  shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
        {loading ? (
          <div className="mt-[250px] text-center text-4xl">Loading Member...</div>
        ) : (
          <div className="">
            {
            data?.users && data.users.map((data, index) => (
              <div className="flex py-10 justify-between border-b-2 border-gray-600" key={index}>
                <div className="w-[40%] md:w-[20%] rounded-[50%]">
                   <h1>Image</h1>
                </div>
                <div>{data.username}</div>
                <div>{data.email}</div>
                <div className="">
                  <Link to ={data._id}>
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
            <button className="my-5 px-2 py-2 bg-green-500 text-white text-xl font-serif rounded-2xl" 
               onClick={() => {
                startTransition(() => {
                  refetch();
                });
              }}
              >
                Fetch
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export default MemberList;

