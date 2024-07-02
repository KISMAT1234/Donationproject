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
      <h1>User Payment Details</h1>
      {
        isLoading ? (
          <h1>Loading...</h1>
          ):(
          <h1>Data</h1>
        )
      }

    </div>
  );
};

export default PaymentDetails;
