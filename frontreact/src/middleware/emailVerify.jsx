import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axiosUrl from '../components/url/Axiosurl';
import { Link } from 'react-router-dom';


const Verify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');

    const param = useParams();

   useEffect(()=>{
    const verifyEmailUrl = async()=>{
         await axiosUrl.get(`/user/${param.id}/verify/${param.token}`).then((response)=>{
           console.log(response.data,'email verify data');
           setEmailMessage(response.data.message);
           setValidUrl(true);
         }).catch((err)=>{
            console.log(err);
            setValidUrl(false);
           
         })
    }
    verifyEmailUrl();
   },[param])

return (
    <>
    {
        validUrl?(
           <div className="ml-[30%] justify-center mt-[20%] items-center">
            <h1 className="text-4xl font-medium">{emailMessage}</h1>
            <Link to="/login-form">
                <button className="text-2xl bg-blue-400 rounded-2xl px-5 mt-5 ml-[20%] py-5">Login</button>
            </Link>
           </div>
        ):(
         <h1>404 Not Found</h1>
        )
    }
      
    </>
)

} 

export default Verify;