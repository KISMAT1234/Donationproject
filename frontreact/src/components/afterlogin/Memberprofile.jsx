import { useParams } from "react-router-dom";
import React,{useState, useEffect} from "react";
import axiosUrl from "../url/Axiosurl";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { BiMaleFemale } from "react-icons/bi";



const Userprofile = () => {
   const {slug} = useParams()
   const [user, setUser] = useState([]);
   const [post, setPost] = useState([]);

   useEffect(() => {
      const getSingleUser = async () => {
         try {
            const response = await axiosUrl.get(`/user/${slug}`);
            console.log(response.data.data,'response data');
            setUser(response.data.data.user);
            setPost(response.data.data.post);
            
         } catch (err) {
            console.error("Error fetching user data:", err);
         }
      };
      getSingleUser();
   },[slug]);

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
                     <div className="text-center bg-stone-200 md:w-[30%] text-4xl font-mono font rounded-2xl px-5 py-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                        <h1 className="mt-5 ">Image</h1>
                        <h1 className="mt-5 ">{data.username}</h1>
                        <h1 className="mt-5 ">Bio</h1>
                        <h1 className="mt-5 ">Follow</h1>
                        <h1 className="mt-5 ">Message</h1>
                     </div>

                

                     <div className=" bg-pink-600 md:w-[65%] text-4xl font-mono font rounded-2xl px-5 py-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
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
                     </div>
                   </div>

                </div>
              ))
            }

              {
              post.map((data, index)=>(
                <div key={index} className="px-5 py-5 bg-green-500  mt-5 md:mx-20 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
