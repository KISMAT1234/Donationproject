import React from 'react';
import { CiCircleCheck } from "react-icons/ci";

const PaymentSuccess = () => {
    return(
        <>
         <CiCircleCheck className="text-[1000%] text-green-600 mt-[200px] ml-[45%] flex"/>
          <h1 className="text-4xl text-center ">Your payment is successfull</h1>
        </>
    )
}


export default PaymentSuccess;