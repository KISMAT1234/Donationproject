import React,{useEffect,useState} from "react";
import axiosUrl from "../url/Axiosurl";
import Topbar from "./bar/Top";
import Leftbar from "./bar/Leftbar"



function Content(){
  

    const [loading, setLoading] = useState(true);
    const [content,setContent]=useState({});

     useEffect(()=>{
      const getContent=async ()=>{
        axiosUrl.get("/upload").then((response)=>{
        console.log(response);
          setContent(response.data);
            setLoading(false);
      }).catch((err)=>{
          console.log(err);
      
      })
      }
      getContent();
     },[])


 

 
    return (
        <>
        <Topbar/>
        <div className="md:flex">
           <Leftbar/>
           <div>
             {loading ? (<div>Loading content...</div>) : <div>
             {
                content.map((data)=>(
                   <div className="bg-green-500">
                   <div>{data.name}</div>
                   <div>{data.address}</div>
                   <div>{data.age}</div>
                   <div>{data.description}</div>
                   </div>
                ))
             }
             </div>
             }
           
            </div>
            </div>

    </>
  )
} 

export default Content;

