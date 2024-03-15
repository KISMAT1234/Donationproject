// import axiosUrl from "../url/Axiosurl";
import Topbar from "./bar/Top";
import Leftbar from "./bar/Leftbar"
import { useSelector} from 'react-redux'

const Favourites = () => {

  const data= useSelector((state)=>state.data) || []
 
  console.log(data)

return (
    <>
      <Topbar/>
      <div className="md:flex">
        <Leftbar/>
        <div className=" w-[100%]">
          {
            data?
            // <h1>I have data</h1>
             data.map((star,index)=>(
              <div key={index}  className=" flex justify-around bg-slate-300 mx-5 my-5 px-5 py-5 rounded-2xl  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                 <div>{index++}</div>
                 <div>{star.name}</div>
                 <div>{star.address}</div>
                 <div>{star.age}</div>
                 <div>{star.description}</div>
                 <div className="w-[30%] md:w-[20%]">
                   <img src={star.image}/>
                 </div>
              </div>
            ))
            :<h1>you dont have data</h1>
          }
        </div>
      </div>
    </>
)
}

export  default Favourites