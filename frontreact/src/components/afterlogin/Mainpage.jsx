import Topbar from "./bar/Top";
import Leftbar from "./bar/Leftbar";
import axiosUrl from "../url/Axiosurl";
import React,{useState, useEffect} from "react"




function Content(){
  const [content,setContent]=useState([]);
  const [loading,setLoading]=useState([]);
  
  useEffect(()=>{
      const getContent=async ()=>{
        axiosUrl.get("/upload").then((response)=>{
        console.log(response.data);
          setContent(response.data);
            setLoading(false);
      }).catch((err)=>{
          console.log(err);
      
      })
      }

      getContent();
  
    },[]);

 

 
    return (
        <>
        <Topbar/>
    <div className="md:flex md:justify-between">
        <div className="">
        <Leftbar/>
        </div>
       
     </div>
          


    </>
  )
} 

export default Content;

