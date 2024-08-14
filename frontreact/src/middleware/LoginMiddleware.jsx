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

 
    if(loading){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>Loading...</h1>
                    </div>
                </div>
            </div>
        )
        }else{
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



