import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosUrl from '../url/Axiosurl';

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
    <div>
      {
        isLoading ? (
          <h1>Loading...</h1>
          ):(
            <>
              <h1>Payment Details</h1>
              {
                data.length>0 ? (
                  data.map((item,index) => (
                    <div key={index}>
                      <h2>Amount: {item.amount}</h2>
                      <p>{item.createdAt} </p>
                      <p>{item.postId.name} </p>
                      <p>Image </p>
                      <p>{item.postId.gender} </p>
                      <p>{item.postId.address} </p>
                      <p>{item.postId.age} </p>
                      <p>{item.postId.phone} </p>
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
