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


//   useEffect(() => {
//     console.log('Loading:', isLoading);
//     console.log('Error:', isError);
//     console.log('Success:', isSuccess);
//     console.log('Status:', status);
//     if (data) {
//       console.log('Data:', data);
//     }
//     if (error) {
//       console.log('Error:', error);
//     }
//   }, [isLoading, isError, isSuccess, status, data, error]);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User Data</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default PaymentDetails;
