import {Outlet} from "react-router-dom"
// import React, {useState,useEffect} from "react";
// import axiosUrl from "../components/url/Axiosurl";


function LoginMiddleware(){
    // const isLogin = true
    // if(isLogin){
    //     <Outlet/>  
    // }
    return(
       <>
        <Outlet/>
       </>
    )
}
export default LoginMiddleware;