// import {Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosUrl from "../url/Axiosurl";
import Topbar from "./bar/Top";
import Leftbar from "./bar/Leftbar"

const Uploadschema = yup.object().shape({
    username: yup.string().required(),
    location: yup.string().required(),
    quantity: yup.string().required(),
    slug: yup.string().required(),
    description: yup.string().required(),
    image: yup.mixed(),
  })
  .required();


function Upload(){

  const {setValue, register,  reset,  handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(Uploadschema),
  });
  
  const errorColor = {
    color:"white"
  }



  const unReload = (data) => {
    let sendData = new FormData();
    sendData.append("username", data.username);
    sendData.append("location", data.location);
    sendData.append("quantity", data.quantity);
    sendData.append("slug", data.slug);
    sendData.append("description", data.description);
    sendData.append("image", data.image);

    axiosUrl.post("/upload", sendData).then((response)=>{
     if(response.data.success){
      alert('register succesfull')
        reset();
     } else{
      console.log(response.data);
    }
    }).catch((err)=>{
      console.log(err);
    })
  };

  return(
    <>
    <Topbar/>
    <div className="md:flex">

    <Leftbar/>
    <div className="border-2 border-green-400 h-[120vh] w-[100%] bg-violet-900 ">
    <h1 className="text-6xl text-blue-400 font-bold ml-10 mt-2 mb-5" >Post Form</h1>
      <form onSubmit={handleSubmit(unReload)}>
        <div className="mx-10 text-2xl font-thin">
        {errors.username?.message && <a style ={errorColor}> <p>{errors.username?.message}</p></a>}
        </div>
        <input type="text" {...register("username")}  name="username" className=" mt-2 border-b-2 border-blue-900 w-[80%] text-3xl  mx-10" placeholder=" UserName " />
        <div className="mx-10 text-2xl font-thin">
        {errors.location?.message && <a style ={errorColor}> <p>{errors.location?.message}</p></a>}
        </div>
        <input type="text" {...register('location')} name="location" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="location"/>
        <div className="mx-10 text-2xl font-thin">
        {errors.quantity?.message && <a style ={errorColor}> <p>{errors.quantity?.message}</p></a>}
        </div>
        <input type="number" {...register("quantity")} name="quantity" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="quantity"/>
         <div className="mx-10 text-2xl font-thin">
        {errors.slug?.message && <a style ={errorColor}> <p>{errors.slug?.message}</p></a>}
        </div>
        <input type="text" {...register("slug")}  name="slug" className=" mt-2 border-b-2 border-blue-900 w-[80%] text-3xl  mx-10" placeholder=" UserName " />
        <div className="mx-10 text-2xl font-thin">
        {errors.description?.message && <a style ={errorColor}> <p>{errors.description?.message}</p></a>}
        </div>
        <input type="text" {...register('description')} name="description" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="description"/>
        <input type="file" className="mx-10 mt-4 text-2xl" name="image" placeholder="profile photo" onChange={(e)=>{setValue("image", e.target.files[0])}}/>

       
        <div className="flex justify-between">
           <button className="hover:bg-orange-600 bg-green-900  w-[30%] text-3xl mx-10 mt-4 text-amber-50"> Post </button>
        </div>
      </form>
      
    </div>
    </div>
    </>
  )
}
export default Upload;