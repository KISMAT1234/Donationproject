import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axiosUrl from '../components/url/Axiosurl';




const emailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

   useEffect(()=>{
    const verifyEmailUrl = async()=>{
         await axiosUrl.get(`/user/${param.id}/verify/${param.token}`).then((response)=>{
           console.log(response.data,'email verify data');
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
           <div>
            <h1>Email verified </h1>
            <Link to="/login">Login</Link>
           </div>
        ):(
         <h1>404 Not Found</h1>
        )
    }
      
    </>
)

} 

export default emailVerify;