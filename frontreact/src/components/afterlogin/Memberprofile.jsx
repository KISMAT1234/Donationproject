import { useParams } from "react-router-dom";
import React,{useState, useEffect} from "react";
import axiosUrl from "../url/Axiosurl";



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
          <div>userProfile</div>
          {
            user.map((data, index)=>(
              <div key={index}>
                 <div>{data.username}</div>
                 <div>{data.email}</div>
              </div>
            ))
          }
            {
            post.map((data, index)=>(
              <div key={index}>
                 <div>{data.name}</div>
                 <div>{data.address}</div>
              </div>
            ))
          }
        </>
    )
}

export default Userprofile;