import React,{useState,useEffect} from "react"
import axiosUrl from "../../url/Axiosurl";


function CreateCategory(){
    const [categories,setCategories]=useState([]);
    
    const getCategories = () =>{
         axiosUrl.get("/category",data).then((response)=>{

         }).catch((err)=>{

         })
    }

    useEffect(()=>{
        getCategories();
    })
   
   
    return(
        <>
      <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Action</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                    { categories.map((data)=> {
                        <td>{data.name}</td>
                    })}
                 
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
          
        </>
    )
}

export default CreateCategory;