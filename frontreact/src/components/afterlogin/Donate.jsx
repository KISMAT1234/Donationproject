import React,{useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import axiosUrl from "../url/Axiosurl";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaCut } from "react-icons/fa";

const Donate = () => {
    const [info, setInfo] = useState([]);
    const [comments, setComments] = useState([]);
    // const [newComments, setNewComments] = useState('');


    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);

    const [user, setUser] = useState([]);
    const {id} = useParams();
    const currentDate = new Date();
// Get the current date and time as strings
    const currentDateStr = currentDate.toDateString();
    const currentTimeStr = currentDate.toLocaleTimeString();

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


 
  
    // const submitComment = (e) => {
    //     e.preventDefault();
    //     if (newComments.trim() !== '') {
    //         setComments([...comments, newComments]);
    //         setNewComments(''); // Clear input after adding comment
    //       }
    //       
    // }
    // console.log(comments,'outside cmt')
    // axiosUrl.post("/comment",{comments}).then((response) => {
    //     console.log(response.data);
    //     setUser(response.data)

    // }).catch((err)=>{
    //    console.log(err);
    // })





    const fetchComments = async () => {
        try {
            const response = await axiosUrl.get(`/comment/${id}`);
            console.log(response.data,"response from backend")
            setCommentsList(response.data); 
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    
  useEffect(() => {
   
    fetchComments();
}, [id]);



useEffect(() => {
    console.log(commentsList, "commentlists array extra useEffect");
}, [commentsList]);

useEffect(() => {
    console.log(commentsList, "commentlists array another useEffect");
}, [id, commentsList]);




    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(comment,'state comment')
        try {
            await axiosUrl.post(`/comment/${id}`, { comment });
            setComment(''); // Clear input after submitting
             // Refresh comments after submitting
             fetchComments()
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

  


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
                <form onSubmit={handleSubmit}>
                   <label for="input-label" className="block text-4xl font-medium mb-2 dark:text-white">Comments</label>
                   <input  type="text" onChange={(e) => setComment(e.target.value)} value={comment} id="input-label" className="bg-slate-200  py-3 px-4 block w-full border-gray-200 rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="write something..."/>
                </form>

                 <div className="mt-5">
                      {commentsList.map((cmt, count)=>(
                         <div key={count} className="mt-5">
                                <div className="flex">
                                    <div className="w-[7%]">
                                        <img src={cmt.userId.image} className=" rounded-[50%]"/>
                                    </div>
                                    <div className="px-5 py-4 ml-3 w-[100%] bg-slate-400 rounded-2xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                                        <div className="flex justify-between">
                                            <div className="flex ">
                                              <div className="text-4xl font-medium">{cmt.userId.username}</div>
                                              <div className="mt-3 ml-2">{currentDateStr}</div>
                                            </div>
                                          <div className="mt-3">{currentTimeStr}</div>
                                        </div>
                                       <div className="my-5">
                                             {cmt.comment}
                                        </div>
                                       <div className="mb-5 flex justify-between">
                                           <div className="flex">
                                              <div className="text-2xl flex ">
                                                <FaThumbsUp/>
                                                <h1 className="ml-2">249</h1>
                                              </div>
                                              <div className="text-2xl flex ml-10 mt-1">
                                                <FaThumbsDown />
                                                <h1 className="ml-2">249</h1>
    
                                              </div>
                                           </div>
                                           <div className="text-2xl flex">
                                               <FaCut className="mt-1"/>
                                               <span className="ml-1">Delete</span>
                                            </div>
                                       </div>
                                    </div>
                                </div>
                          </div>
                       ))}
                </div>
            </div>
          </div> 
        </>
    );
};

export default Donate


