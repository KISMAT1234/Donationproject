import { useParams } from "react-router-dom";
import React,{useState, useEffect} from "react";
import axiosUrl from "../url/Axiosurl";



const Userprofile = () => {
   const {slug} = useParams()
   const [singleUser, setSingleUser] = useState([]);

   useEffect(() => {
      const getSingleUser = async () => {
         try {
            const response = await axiosUrl.get(`/user/${slug}`);
            // console.log(response.data.data,'response data');
            setSingleUser(response.data.data);
            
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
            singleUser.map((data, index)=>(
              <div key={index}>
                 <div>{data.username}</div>
                 <div>{data.email}</div>
              </div>
            ))
          }
        </>
    )
}

export default Userprofile;