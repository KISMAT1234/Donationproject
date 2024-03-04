import React,{useEffect,useState} from "react";
import axiosUrl from "../url/Axiosurl";
import { Link } from "react-router-dom";



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
  },[]);

    return(
        
        <>
        <h1>Members</h1>

              
       
          <main id="main" className="main">
            <section className="section dashboard">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <h1 className="mt-3 mb-3" >Show Users</h1>
                      {loading ? (<div>Loading...</div>) : <div>
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
        </>
        )
    }

export default MemberList;