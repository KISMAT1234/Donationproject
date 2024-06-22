import { Link, useParams } from "react-router-dom";
import React,{useState, useEffect} from "react";
import axiosUrl from "../url/Axiosurl";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { BiMaleFemale } from "react-icons/bi";



const Userprofile = () => {
   const {id} = useParams()
   const [user, setUser] = useState([]);
   const [post, setPost] = useState([]);
   const [follow, setFollow] = useState(false);
  //  const [follow, setFollow] = useState(false);
   useEffect(() => {
      const getSingleUser = async () => {
         try {
            const response = await axiosUrl.get(`/user/${id}`);
            console.log(response.data.data,'response user');
            setUser([response.data.data.user]);
            setPost(response.data.data.post);
            setFollow(response.data.data.isFollowed);
         } catch (err) {
            console.error("Error fetching user data:", err);
         }
      };
      getSingleUser();
   },[id]);

   const onFollow = (id) => {
     setFollow(!follow)
    axiosUrl.post(`/follow/${id}`).then((response)=>{
     console.log(response.data.data,'response of follow ');
    //  setFollow(response.data.data.isFollowing);
    }).catch((err) => {
     console.log(err,'error');
    })

}

    return (
        <>
          <div className="px-5 py-5 bg-violet-300 shadow-[5px_5px_0px_0px_rgba(109,40,217)]"> 
            {/* <div>
               <div>

               </div>
               <div></div>
            </div>
            <div></div> */}
            {
              user.map((data, index)=>(
                <div key={index}>
                   <div className="md:flex justify-between">
                     <div className="text-center bg-stone-200 md:w-[30%] text-4xl md:text-2xl font-mono font rounded-2xl px-5 py-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                        <h1 className="mt-5 ">Image</h1>
                        <h1 className="mt-5 ">Name:{data.username}</h1>
                        <h1 className="mt-5 ">ProfileViews:{data.profileViews}</h1>
                        <h1 className="mt-5 ">Message</h1>
                     </div>
                     <div className=" bg-gray-400 md:w-[65%] text-4xl font-mono font rounded-2xl px-5 py-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                       <div className="flex mt-5">
                        <FaPhoneAlt />:
                        <h1>+977 9812345678</h1>
                       </div>
                       <div className="flex mt-5">
                         <BiMaleFemale />:
                         <h1>Male</h1>
                       </div>
                       <div className="flex mt-5">
                         <CiLocationOn />:
                         <h1>Srinagar-2, bandipur</h1>
                       </div>
                       <div className="flex mt-5">
                         <MdOutlineEmail />:
                         <h1>{data.email}</h1>
                       </div>
                       <div className="mt-5 flex justify-between">
                          { follow ? (
                              <button onClick={()=>onFollow(data._id)}> 
                                <h1 className="text-white  bg-red-500 rounded-2xl px-2 py-2">unFollow</h1>
                              </button>
                          ) : (

                            <button onClick={()=>onFollow(data._id)} className="bg-green-600 hover:bg-green-500 hover:scale-110 px-2 py-2 rounded-2xl text-white">
                               <h1>Follow</h1>
                            </button>
                          )
                          }
                          <div>
                            <Link to="/messages">

                              <h1 className="bg-green-600 hover:bg-green-500 hover:scale-110 px-2 py-2 rounded-2xl text-white">Send Message</h1>
                            </Link>
                          </div>
                       </div>
                     </div>
                   </div>

                </div>
              ))
            }

              {
              post.map((data, index)=>(
                <div key={index} className="px-5 text-stone-50 py-5 bg-gray-500 rounded-xl  mt-5 md:mx-20 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                   <div>{data.name}</div>
                   <div>{data.address}</div>
                   <div>{data.age}</div>
                   <div>{data.description}</div>
                   <div>{data.image}</div>
                   <div></div>
                </div>
              ))
            }
          </div>
        </>
    )
}

export default Userprofile;
