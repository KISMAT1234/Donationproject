// import axiosUrl from "../url/Axiosurl";
import { useSelector} from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons';
const Favourites = () => {

  const data= useSelector((state)=>state.data) || []
 
  console.log(data)

return (
    <>
    
        <div className=" w-[100%] mt-10">
          {
            // data?
            // <h1>I have data</h1>
             data.map((star,index)=>(
              <div key={index}  className=" md:flex md:justify-around bg-slate-300 mx-5 my-5 px-5 py-1 rounded-2xl  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                 <div className="mt-4">{index++}</div>
                 <div className="mt-4">{star.name}</div>
                 <div className="mt-4">{star.address}</div>
                 <div className="mt-4">{star.age}</div>
                 <div className="mt-4">{star.description}</div>
                 <div className="w-[full] md:w-[20%]">
                   <img src={star.image}/>
                 </div>
                 <div className="text-4xl text-center mt-10">
                   <DeleteOutlined className=" hover:bg-red-600 rounded-md px-2 py-2 cursor-pointer"/>
                  </div>
              </div>
            ))
          }
          <div className = "flex justify-center">
             <div className="text-4xl font-medium text-center px-3 py-3 w-[180px] bg-red-600 rounded-xl cursor-pointer hover:bg-red-500 hover:text-stone-300">
                <h1>Clear all</h1>
              </div>
          </div>

        </div>
    </>
)
}

export  default Favourites