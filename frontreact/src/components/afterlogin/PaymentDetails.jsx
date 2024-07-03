import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosUrl from '../url/Axiosurl';
import { MdAttachMoney } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const fetchPost = async () => {
  const response = await axiosUrl.get('/donate');
  console.log(response, 'res');
//   const data = await response.json();
  return response.data.data; // Returning the whole data as there is no payment field in the API response
};

const PaymentDetails = () => {
  const { data, error, isLoading, isError, isSuccess, status } = useQuery({
    queryKey: ['payment'],
    queryFn: fetchPost,
    staleTime: 5 * 1000,
  });
  console.log('Data:', data);

  return (
    <div className="px-5 py-2">
      {
        isLoading ? (
          <h1>Loading...</h1>
          ):(
            <>
              <h1 className="text-4xl">Payment Details</h1>
              {
                data.length>0 ? (
                  data.map((item,index) => (
                    <div key={index} className="bg-stone-400 rounded-2xl px-5 py-5 my-2 flex justify-between">
                      <div className="flex">
                          <div>Image</div>
                          <div className="mx-2 text-xl font-mono">
                            <p>{item.postId.name} </p>
                            <p>{item.postId.gender} </p>
                            <p>{item.postId.address} </p>
                            <p>{item.postId.phone} </p>
                          </div>
                      </div>
                      <div className="font-mono flex text-xl">
                        <MdAttachMoney />
                        <h2 className="">Amount:</h2>
                        <h2 className="bg-green-500 h-[4vh] text-white px-2 ">{item.amount}</h2>
                      </div>
                      <div className="font-mono flex text-xl">
                        <IoMdTime />
                        <p>{item.createdAt}</p>
                      </div>
                      
                    </div>
                ))
                ): (
                  <h1 className="text-4xl text-red-500 text-center mt-[20]">You haven't done any payment</h1>
                )
              } 
          </>
        )
      }

    </div>
  );
};

export default PaymentDetails;
