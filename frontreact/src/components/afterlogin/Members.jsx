import React,{useEffect,useState} from "react";
import axiosUrl from "../url/Axiosurl";
import { Link } from "react-router-dom";
import Topbar from "./bar/Top";
import Leftbar from "./bar/Leftbar"
import member from "../image/member.jpg"




function MemberList(){
  

    const [loading, setLoading] = useState(true);
    const [users,setUsers]=useState({});

      useEffect(()=>{

      const getUser=async ()=>{
        axiosUrl.get("/user").then((response)=>{
        console.log(response);
          setUsers(response.data);
            setLoading(false);
      }).catch((err)=>{
          console.log(err);
      
      })
      }
      getUser();
    })



    return(
        <>
        <Topbar/>
        <div className="md:flex"> 
          <Leftbar/>
          <div className="md:flex">
            <main id="main" className="main mt-5">
              <section className="section dashboard">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        {loading ? (<div>Loading...</div>) : 
                        
                        <div className="border-2  px-5 py-5 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                        <table className="table table-hover">
                              <thead>
                              <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                     <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                { users.map((user,index)=>(
                                  <tr key={index}>
                                  <td>{++index}</td>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                  
                                  <td>
                                      <Link to="#" className="bg-green-600   rounded-xl h-20 mx-10  text-2xl">Edit</Link>
                                      <button className="bg-red-500 text-2xl rounded-xl h-10 ">Delete</button>
                                  </td>
                              </tr>
                              ))
                              }
                             
                              
                              </tbody>
                          </table>
                          
                          </div>}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
            <div>
              <img src={member} className="w-[600px] m-[20px]"/>
            </div>
            </div>
         </div>   
        </>
        )
    }

export default MemberList;