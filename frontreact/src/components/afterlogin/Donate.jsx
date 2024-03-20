import React,{useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import axiosUrl from "../url/Axiosurl";

const Donate = () => {
    const [info, setInfo] = useState([]);
    const {id} = useParams();

       const getInfo = () =>{
           axiosUrl.get(`/upload/${id}`).then((response)=>{
            // console.log(response.data);
               setInfo(response.data)
           }).catch((err)=>{
               console.log(err)
           })
       }
    useEffect(()=>{
        getInfo()
    },[id]);


    return (
        <>
          <div className="md:flex px-5 py-10">
              <div className="md:w-[50%] hover:opacity-100">
                 <img src={info.image} className="rounded-2xl w-[100%]"/>
              </div>

              <div className="md:w-[50%] md:px-10">
                 <div>
                    <h1 className="text-6xl font-bold">{info.name}</h1>
                    <h1 className="text-2xl mt-5">{info.address}</h1>
                    <h1 className="text-2xl mt-5">{info.age}</h1>
                    <h1 className="text-2xl mt-5">{info.description}</h1>
                 </div>
                 <div className="flex justify-between mt-10">
                    <h1 className="mt-3 text-2xl bg-red-200"> Raised: $4500000</h1>
                    <button className="bg-green-500 rounded-xl text-4xl w-[200px] hover:bg-green-300">Donate</button>
                 </div>
              </div>
          </div>
        </>
    );
};

export default Donate


