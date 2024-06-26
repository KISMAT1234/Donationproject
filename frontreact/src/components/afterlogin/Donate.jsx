import React,{useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import axiosUrl from "../url/Axiosurl";
import {loadStripe} from '@stripe/stripe-js';
import { FaCut, FaShare,FaFacebook,FaInstagram,FaTiktok,FaWhatsapp,FaUser,FaThumbsUp,FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { MdOutlineMailOutline,MdDelete } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import {  Popconfirm,message } from 'antd';
import { CiEdit } from "react-icons/ci";
import { SmileOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd';

import { socket } from '../../socket';
import { Input, Tooltip } from 'antd';
import { QRCode } from 'antd';

import { userId } from './Mainpage';

import { useDispatch, useSelector  } from 'react-redux';
import { fetchPayment } from '../../slices/paymentSlice';

const formatNumber = (value) => new Intl.NumberFormat().format(value);
const NumericInput = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };
  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
  ) : (
    'Enter the amount in Nepelase currency'
  );
  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter the amount here for further processing"
        maxLength={16}
      />
    </Tooltip>
  );
};

const downloadQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};



  // const token = localStorage?.getItem('token');
  // if(token){
  //   const decodedToken = jwtDecode(token);
  // }
  // export const userId = decodedToken?.id;


  
const Donate = () => {
    const [info, setInfo] = useState([]);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState([]);
    const {id} = useParams();
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const [liked, setLiked] = useState()
    const [disliked, setDisliked] = useState();
    const [likeCount, setLikeCount] = useState();
    const [dislikeCount, setDislikeCount] = useState(0);
    const [delComment, setDelComment] = useState(false)
    const [value, setValue] = useState('');

    const dispatch = useDispatch();
    const paymentState = useSelector((state) => state.payment || [])

    console.log(paymentState,'asyncthunk state value')

    useEffect(()=>{
         dispatch(fetchPayment(id));
    },[id])

    // console.log(userId,'userId');

    const getInfo = async() =>{
        await axiosUrl.get(`/upload/${id}`).then((response)=>{
        //  console.log(response.data);
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
            // console.log(response.data.data,"response of fetchedcomments")
            // console.log(response.data[0].like)  
            setCommentsList(response.data.data);  
            setLikeCount(response.data[0].like) 
            setDislikeCount(response.data[0].dislike) 
            setLiked(response.data[0].likeIcon)  
            // setdisLiked(response.data[0].disLikeIcon) 

            // if(response.data..)
            
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        };
        
      useEffect(() => {
        fetchComments();
     }, [id,liked,disliked]);

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
            const response = await axiosUrl.post(`/comment/${id}`, { comment });
            setComment(''); // Clear input after submitting
             // Refresh comments after submitting
             fetchComments()
             notification.open({
              message: 'Comment added Succesfully',
              description:'Thank you for adding comment and giving review. Hope this comment motivates us to be more active in social welfare.',
              icon: (
                <SmileOutlined
                  style={{
                    color: '#108ee9',
                  }}
                />
              ),
              onClick: () => {
                console.log('Notification Clicked!');
              },
            });

            // if(response.data.data.success === true){
              socket.emit('notification', {
                // commenterId: localStorage.getItem('userId'),
                postId:id,
                userId:userId,
            });
            // }

        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleLike = async(id) => {
        console.log(id,'cmt id')
        // if (liked) {
        //     setLiked(false);
        //   } else {
        //     setLiked(true);
        //     setDisliked(false);
        // }
        try {
            const response = await axiosUrl.post(`/comment/like/${id}`);
            // console.log(response.data.data.like,"response from backend")
            // setLikeCount(response.data.data.like); 
            // if (response.data.data.likeIcon === false) {
            //   setLiked(false);
            // } else {
            //   setLiked(true);
            //   setDisliked(false);
            // }
           

        } catch (error) {
            console.error('server error', error);
        }
    };

    // const getLike = async () => {
    //     const response = await axiosUrl.get("/comment/getLike");
    //     console.log(response.data.data.like,"response from backend")
    //     // setLikeCount(response.data.data.like); 
    // }
    // useEffect(()=>{
    //     getLike()
    // },[liked]);


      const handleDislike = async(id) => {
        console.log(id,'cmt id');
        if (disliked) {
            setDisliked(false);
            // setDislikeCount(dislikeCount-1)
          } else {
            setDisliked(true);
            // setDislikeCount(dislikeCount+1)
            // setLikeCount(()=>{
            //     if(likeCount === 0){
            //         setLikeCount(0);
            //     }else{
            //         setLikeCount(likeCount-1);
            //     }
            // })
            setLiked(false);
          }

          try {
            const response = await axiosUrl.post(`/comment/dislike/${id}`);
            // console.log(response.data,"response from backend")
            // setCommentsList(response.data); 
        } catch (error) {
            console.error('server error', error);
        }
      };

    //   useEffect(()=>{
    //     const data = () => {
    //         axiosUrl.get("/comment/like").then((response)=>{
    //             console.log(response.data)
    //             setLikeCount(response.data)
    //         })
    //     }
    //   },[])

    const deleteComment = async (commentId) => {
      // console.log(commentId,"delete comment Id");
      if (window.confirm('Are you sure you want to delete?')) {
        await axiosUrl.delete(`/comment/${commentId}`).then((response)=>{
          // console.log(response.data,'response of deletion');
          if(response.data.success === true){
             setCommentsList(commentsList.filter(comment => comment._id !== commentId)); // used to update the state of the comments list by removing a specific comment without needing to refresh the page. Here's a detailed explanation of each part:
              notification.open({
                message: 'Comment deleted Succesfully',
                description:'Comment deleted from this post. Hope you provide a positive feedback so that we can help to others needy people for fund raising',
                icon: (
                  <SmileOutlined
                    style={{
                      color: '#108ee9',
                    }}
                  />
                ),
                onClick: () => {
                  console.log('Notification Clicked!');
                },
              });
            }else{ 
              notification.open({
               message: 'Unsuccessfull deleting comment!',
               description:'You cannot delete others user comment',
                onClick: () => {
                 console.log('Notification Clicked!');
                },
              });
              alert('unsuccessfull deleting comment')
            }
          }).catch((err)=>{
              console.log(err)
          })
      }
      try{
          // axiosUrl.delete("/comment/")
      }
      catch(err){
        console.log(err);
      }
    }

  

    const makePayment = async () => {
      if(value === ''){
        alert('Please enter amount in to donate')
      }else{
        try{
        let stripe = await loadStripe('pk_test_51P5lamRoqDgXi4MO8PsUe41RycAxZ28LQOz9hqq90lEyajIk8g0XnmmPyFHrx9khOhydesEDsWCcYcOMIqthCNz300OOPT7OmJ');

        const response = await axiosUrl.post('/donate',{
          postData: info,
          amount: value
        });
        // console.log(response,'response');
        const sessionId = response.data.data;
        await stripe.redirectToCheckout({sessionId});
        }catch(err){
            console.log(err);
        }

        stripe.redirectToCheckout({
            sessionId: response.id
        })
      }
    }
    //   console.log(info.userId?.email,'info')


    return (
        <>
        <div className=" px-5 ">
            <h1 className="mb-3 text-3xl md:text-4xl font-black">{info.topic}</h1>
             <div className="md:flex">
                 <div className="md:w-[50%]  hover:opacity-100">
                    <img src={info.image} className="rounded-2xl w-[100%]"/>
                 </div>
                 <div className="md:w-[50%] mt-4 md:px-10">
                    <div className="flex ">
                      <div>
                        <h1 className="text-3xl ">{info.name}</h1>
                        <h1 className="text-2xl mt-2">{info.address}</h1>
                        <h1 className="text-2xl mt-2">{info.age}</h1>
                        <h1 className="text-2xl mt-2">{info.gender}</h1>
                        <h1 className="text-2xl mt-2">+{info.phone}</h1>
                        <h1 className="text-2xl mt-2">157 Donors</h1>
                      </div>
                      <div className=" bg-orange-600 px-2 py-4 w-full mx-4 rounded-2xl shadow-2xl shadow-blue-500/20">
                        <h1 className="text-2xl text-center font-serif">Start your process here</h1>
                        <div id="myqrcode" className="mx-5">
                          <QRCode value="https://ant.design/" bgColor="#fff" style={{ marginBottom: 10 }} />
                          <Button type="primary" onClick={downloadQRCode}>
                            Download
                          </Button>
                        </div>
                        <div>
                        </div>
                        <NumericInput
                          value={value}
                          onChange={setValue}
                        />
                        <div className="my-2 flex justify-center">
                          <Button  ghost onClick={makePayment} className="">Donate</Button>
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-3 text-2xl bg-red-600"> Raised: $4500000</h1>

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
                <div className="mx-2 rounded-xl  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                   <h1 className="px-5 py-5 text-4xl bg-violet-500">Donors</h1>
                   {
                    paymentState.data?.data.length > 0 ? ( 
                        paymentState.data.isLoading ? (
                            <h1>Loading...</h1>
                          ):(
                          paymentState.data?.data.map((donor,index)=>(
                            <>
                              <div className="flex justify-between" key={index}>
                                <h1 className="px-10 py-2 text-2xl">Image</h1>
                                <h1 className="px-10 py-2 text-2xl">{donor.donorId.username}</h1>
                                <h1 className="px-5 py-2 text-2xl">${donor.amount}</h1>
                              </div>
                            </>
                          ))
                        )
                      
                    ):(
                      <h1 className="mx-10 mt-[25%] text-xl font-light">         
                         There is no any donor in this campaign.
                      </h1>
                    )
                   }
                </div>      
            </div>

            <div className="my-2">
                <form onSubmit={handleSubmit}>
                   <label  htmlFor="input-label" className="block text-4xl font-medium mb-2 text-black">Comments</label>
                   <input  type="text" onChange={(e) => setComment(e.target.value)} value={comment} id="input-label" className="  py-3 px-4 block w-full border-gray-200 rounded-lg text-xl focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-400 dark:border-gray-700 dark:text-black" placeholder="write something..."/>
                </form>
                
                
                 <div className="my-5 ">
                      {commentsList.map((cmt, countId)=>(
                         <div key={countId} className="mt-5">
                                <div className="flex">
                                    <div className="w-[7%]">
                                        <img src={cmt.userId.image} className=" rounded-[50%]"/>
                                    </div>
                                    <div className="px-5 py-4 ml-3 w-[100%] bg-slate-200 rounded-2xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                                        <div className="flex justify-between">
                                            <div className="flex ">
                                              <div className="text-4xl font-medium">{cmt.userId.username}</div>
                                              <div className="mt-3 ml-2">{cmt.createdAt}</div>
                                            </div>
                                          <div className="mt-3 text-2xl">
                                            {
                                                cmt.userId._id === userId && (
                                                  <>
                                                    <button  className="px-1 py-1 h-10">  
                                                       <CiEdit className="text-3xl  hover:text-blue-600"/>
                                                     </button>
                                                  </>
                                                )
                                              }
                                          </div>
                                        </div>
                                       <div className="my-5">
                                             {cmt.comment}
                                        </div>
                                       <div className="mb-5 flex justify-between">
                                           <div className="flex">
                                              <div className="text-4xl flex ">
                                                  <button 
                                                    onClick={()=>handleLike(cmt._id)} 
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
                                                    onClick={()=>handleDislike(cmt._id)} 
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
                                              {
                                                cmt.userId._id === userId && (
                                                  <>
                                                    <button  className="px-1 py-1 h-10" onClick={()=> deleteComment(cmt._id)}>  
                                                       <MdDelete className="text-5xl text-red-500 hover:text-red-600"/>
                                                     </button>
                                                  </>
                                                )
                                              }
                                            
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




