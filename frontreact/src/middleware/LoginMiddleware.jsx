import {Outlet} from "react-router-dom"
import React, {useState,useEffect} from "react";
import axiosUrl from "../components/url/Axiosurl";


function LoginMiddleware(){
    let token=localStorage.getItem("token") ?? "";
    
    const [isLogin,setIsLogin]=useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        axiosUrl.get("/login/tokenmatch",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            if(response.data.success){
                setIsLogin(true);
                setLoading(false);
            }else{
                setIsLogin(false);
                setLoading(false);
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
        );
    }else{
        if(isLogin){
            return(
                <Outlet/>
            );
        }else{
            window.location.href="/";
        }
    }
}
export default LoginMiddleware;