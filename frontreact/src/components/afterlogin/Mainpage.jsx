import React,{useEffect,useState,useRef} from "react";
import axiosUrl from "../url/Axiosurl";
import Topbar from "./bar/Top";
import Leftbar from "./bar/Leftbar"
import save from  '../image/save.gif'




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


    const onSubmit = () =>{
      alert("added to favourite");
    }

 
    return (
        <>
        <Topbar/>
        <div className="md:flex">
           <Leftbar/>
    
             {loading ? (<div>Loading content...</div>) : <div className="flex flex-wrap">
             {
                content.map((data)=>(
                  <div className="px-5 h-max ml-5 py-5 mt-5 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                   <div>{data.name}</div>
                   <div>{data.address}</div>
                   <div>{data.age}</div>
                   <div>{data.description}</div>
                   <button onClick={onSubmit} className="mt-5 ">
                     <img src={save} className="h-[5vh]"/>
                   </button>
                   </div>
                ))
             }
             </div>
             }
           
            </div>

    </>
  )
} 

export default Content;

