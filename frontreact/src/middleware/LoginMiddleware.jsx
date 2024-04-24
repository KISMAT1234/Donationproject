import Layout from "../components/afterlogin/bar/Outlet";
import React, {useState,useEffect} from "react";
import axiosUrl from "../components/url/Axiosurl";

import Swal from 'sweetalert2'



function LoginMiddleware(){
    const [isLogin,setIsLogin]=useState(false);
    const [loading, setIsLoading] = useState(true);

    useEffect(()=>{
        axiosUrl.get("/login/token").then((response)=>{
                // console.log(response)
                if(response.data.success){
                    setIsLogin(true);
                    setIsLoading(false);
                }else{
                    setIsLogin(false);
                    setIsLoading(false);
                }
            }).catch((err)=>{
                console.log(err);
            
            })
        
            
        },[]);

    useEffect(()=>{

    },[loading])

    
        if(loading)
            {
                <h1>Loading content</h1>
            }
        // {
        //             Swal.fire({
        //               icon: "success",
        //               title: "Login Successfull",
        //               showConfirmButton: false,
        //               timer: 1500
        //             });
        //          }
            else{
            if(isLogin){
                return(
                    <>
                    <Layout></Layout>
                  </>
                );
            }else{
                window.location.href="/";
            }
        }
}
export default LoginMiddleware;