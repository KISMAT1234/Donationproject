import React,{useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import axiosUrl from "../url/Axiosurl";

const Donate = () => {
    const [info, setInfo] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComments, setNewComments] = useState('');
    const {id} = useParams();

       const getInfo = () =>{
           axiosUrl.get(`/upload/${id}`).then((response)=>{
            console.log(response.data);
               setInfo(response.data)
           }).catch((err)=>{
               console.log(err)
           })
       }
    useEffect(()=>{
        getInfo()
    },[id]);
  
    const click = (e) => {
        e.preventDefault();
        console.log("hello kismat")
        if (newComments.trim() !== '') {
            setComments([...comments, newComments]);
            setNewComments(''); // Clear input after adding comment
          }

    }
    console.log(comments)

    return (
        <>
        <div className=" px-5 py-10">
            <div className="md:flex">
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
     
                   <hr></hr>
             
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-thin mb-10">
                    The Healthy People initiative is designed to guide national health promotion and disease prevention efforts to improve the health of the nation. Released by the U.S. Department of Health and Human Services (HHS) every decade since 1980, Healthy People identifies science-based objectives with targets to monitor progress and motivate and focus action. Healthy People has established benchmarks in order to:
                </h1>
            </div>
            <div>
                <form onSubmit={click}>
                   <label for="input-label" class="block text-4xl font-medium mb-2 dark:text-white">Comments</label>
                   <input  type="text" onChange={(e) => setNewComments(e.target.value)} value={newComments} id="input-label" class="bg-slate-200  py-3 px-4 block w-full border-gray-200 rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="write something..."/>
                </form>
                <div>
                <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
                </div>
            </div>
          </div> 
        </>
    );
};

export default Donate


