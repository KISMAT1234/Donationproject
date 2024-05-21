import React,{useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import axiosUrl from "../url/Axiosurl";
import {loadStripe} from '@stripe/stripe-js';
import { FaCut, FaShare,FaFacebook,FaInstagram,FaTiktok,FaWhatsapp,FaUser,FaThumbsUp,FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";


const Donate = () => {
    const [info, setInfo] = useState([]);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState([]);
    const {id} = useParams();
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);


   

    const handleLike = () => {
        if (liked) {
            setLiked(false);
            setLikeCount(likeCount-1)
          } else {
            setLiked(true);
            setLikeCount(likeCount+1)
            setDislikeCount(()=>{
                if(dislikeCount === 0){
                    setDislikeCount(0);
                }else{
                    setDislikeCount(dislikeCount-1);
                }
            })
            setDisliked(false);
          }
      };

      const handleDislike = () => {
        if (disliked) {
            setDisliked(false);
            setDislikeCount(dislikeCount-1)
          } else {
            setDisliked(true);
            setDislikeCount(dislikeCount+1)
            setLikeCount(()=>{
                if(likeCount === 0){
                    setLikeCount(0);
                }else{
                    setLikeCount(likeCount-1);
                }
            })
            setLiked(false);
          }
      };


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




    const fetchComments = async () => {
        try {

            const response = await axiosUrl.get(`/comment/${id}`);
            // console.log(response.data,"response from backend")
            setCommentsList(response.data); 
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    
  useEffect(() => {
   
    fetchComments();
}, [id]);



useEffect(() => {
    // console.log(commentsList, "commentlists array extra useEffect");
}, [commentsList]);

useEffect(() => {
    // console.log(commentsList, "commentlists array another useEffect");
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

    const makePayment = async () => {
        try{
        let stripe = await loadStripe('pk_test_51P5lamRoqDgXi4MO8PsUe41RycAxZ28LQOz9hqq90lEyajIk8g0XnmmPyFHrx9khOhydesEDsWCcYcOMIqthCNz300OOPT7OmJ');

        const response = await axiosUrl.post('/donate',info);
        console.log(response,'response');
        const sessionId = response.data.data;
        await stripe.redirectToCheckout({sessionId});
        }catch(err){
            console.log(err);
        }

        stripe.redirectToCheckout({
            sessionId: response.id
        })
    }

//   console.log(info.userId?.email,'info')


    return (
        <>
        
        <div className=" px-2 ">
            <h1 className="mb-3 text-3xl md:text-4xl font-black">{info.topic}</h1>
             <div className="md:flex">
                 <div className="md:w-[50%]  hover:opacity-100">
                    <img src={info.image} className="rounded-2xl w-[100%]"/>
                 </div>
                 <div className="md:w-[50%] md:px-10">
                    <div>
                       <h1 className="text-3xl ">{info.name}</h1>
                       <h1 className="text-2xl mt-2">{info.address}</h1>
                       <h1 className="text-2xl mt-2">{info.age}</h1>
                       <h1 className="text-2xl mt-2">{info.gender}</h1>
                       <h1 className="text-2xl mt-2">+{info.phone}</h1>
                       <h1 className="text-2xl mt-2">157 Donors</h1>
                       
                    </div>
                    <div className="flex justify-between mt-10">
                       <h1 className="mt-3 text-2xl bg-purple-600"> Raised: $4500000</h1>
                       <button onClick={makePayment} className="bg-green-500 rounded-xl text-4xl w-[200px] hover:bg-green-300">Donate</button>
                    </div>

                    <div className="flex my-5">
                        <h1 className="text-2xl font-italic">Share</h1>

                        <FaShare className=" mx-2 text-4xl"/>:
                        <FaFacebook  className=" mx-2 text-4xl"/>
                        <FaInstagram className=" mx-2 text-4xl"/>
                        <FaTiktok className=" mx-2 text-4xl"/>
                        <FaWhatsapp className=" mx-2 text-4xl"/>
     
                    </div>

                    <hr></hr>
        
                 </div>
             </div>
            <div>
                <h1 className="text-2xl mt-5 font-serif mb-10">
                     {info.description}
                </h1>
            </div>

            <div className="md:flex justify-between">

               <div className="rounded-2xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                
                  <h1 className="px-5 py-5 text-4xl  bg-slate-500">Campaign details</h1>

                   <div className="flex text-3xl mx-5 my-5">
                        <FaUser  className="mr-2"/>
                        {info.userId?.username} 
                    </div>  

                    <div className="flex text-3xl mx-5 my-5">
                        <MdOutlineMailOutline className="mr-2"/>
                        {info.userId?.email} 
                    </div> 

                    <div className="flex text-3xl mx-5 my-5">
                        <FaPhoneAlt className="mr-2"/>
                        <h1>+977 9837462092</h1> 
                    </div> 

                    <div className="flex text-3xl mx-5 my-5">
                    <FaLocationDot  className="mr-2"/>
                        <h1>baneshwor-29, Kathmandu</h1> 
                    </div> 

                   
                </div>

                <div className=" rounded-xl  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                   <h1 className="px-5 py-5 text-4xl bg-violet-500">Donors</h1>
                   <div className="flex justify-between">
                      <h1 className="px-10 py-5 text-2xl">Image</h1>
                      <h1 className="px-10 py-5 text-2xl">Name</h1>
                      <button className="mx-2 bg-green-900 rounded-2xl">
                        <h1 className="px-5  text-2xl">Follow</h1>
                      </button>
                   </div>
                  
                

                        
                      
                </div>

             
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                   <label  htmlFor="input-label" className="block text-4xl font-medium mb-2 dark:text-white">Comments</label>
                   <input  type="text" onChange={(e) => setComment(e.target.value)} value={comment} id="input-label" className="bg-slate-200  py-3 px-4 block w-full border-gray-200 rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="write something..."/>
                </form>

                 <div className="my-5 ">
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
                                              <div className="mt-3 ml-2">Date</div>
                                            </div>
                                          <div className="mt-3">anything</div>
                                        </div>
                                       <div className="my-5">
                                             {cmt.comment}
                                        </div>
                                       <div className="mb-5 flex justify-between">
                                           <div className="flex">
                                              <div className="text-4xl flex ">
                                                  <button 
                                                    onClick={handleLike} 
                                                    style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                                                  >
                                                    {liked ? (
                                                      <FaThumbsUp style={{ color: 'blue' }} />
                                                    ) : (
                                                      <FaRegThumbsUp style={{ color: 'black' }} />
                                                    )}
                                                  </button>
                                                <h1 className="ml-2">{likeCount}</h1>
                                              </div>
                                              <div className="text-4xl flex ml-10 mt-1">
                                                <button 
                                                    onClick={handleDislike} 
                                                    style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                                                  >
                                                    {disliked ? (
                                                      <FaThumbsDown style={{ color: 'blue' }} />
                                                    ) : (
                                                      <FaRegThumbsDown style={{ color: 'black' }} />
                                                    )}
                                                  </button>
                                                <h1 className="ml-2">{dislikeCount}</h1>
    
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


