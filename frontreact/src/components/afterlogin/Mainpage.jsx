import React,{useEffect,useState,useRef} from "react";
import axiosUrl from "../url/Axiosurl";
import save from  '../image/save.gif'
import { useDispatch } from 'react-redux'
import {Star} from "../../slices/addSlice"
import {Link} from "react-router-dom";



function Content(){
  

    const [loading, setLoading] = useState(true);
    const [content,setContent]=useState({});
    const dispatch = useDispatch()

 

     useEffect(()=>{
      const getContent=async ()=>{
        axiosUrl.get("/upload").then((response)=>{
        // console.log(response);
          setContent(response.data);
            setLoading(false);
      }).catch((err)=>{
          console.log(err);
      
      })
      }
      getContent();
     },[])


    const onSubmit = (content) =>{
      let data=[];
      data.push(content);
      // console.log(data);
      dispatch(Star(data));


      alert("added to favourite");
    }

 
    return (
        <>
    
    
             {loading ? (<div>Loading content...</div>) : <div className=" sm:grid sm:grid-cols-2 md:grid-cols-3">
             {
                content.map((data,index)=>(
                  <div key={index}  className="md:w-[90%] h-[70vh] px-5 h-max ml-5 mr-5 py-5 mt-10 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                   <div>{data.name}</div>
                   <div>{data.address}</div>
                   <div>{data.age}</div>
                   <div>{data.description}</div>
                   <div className="">
                       <img src={data.image} width="100" className="w-[90%]" />
                    </div>
                   <div className="mt-5 flex justify-between">
                      <div>
                      <Link to={"donate/"+data._id}>
                         <button className="bg-green-500 h-[45px] text-2xl w-[120%] rounded hover:bg-red-600">
                            Donate Now
                         </button>
                       </Link>

                      </div>
                      <div>
                        <button onClick={()=>onSubmit(data)} className="">
                          <img src={save} className="h-[5vh]"/>
                        </button>
                      </div>
                   </div>
                   
                   </div>
                ))
             }
             </div>
             }
    </>
  )
} 

export default Content;

