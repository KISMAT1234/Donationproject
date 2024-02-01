import Nav from "./Navbar"
import {Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosUrl from "../url/Axiosurl";

const Signupschema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    confirmpassword: yup.string().required().oneOf([yup.ref('password'),null],'password not match'),
  })
  .required();


function Signup(){

  const {setValue, register,  reset,  handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(Signupschema),
  });
  
  const errorColor = {
    color:"white"
  }



  const unReload = (data) => {

    let sendData = new FormData();
    sendData.append("username", data.username);
    sendData.append("email", data.email);
    sendData.append("password", data.password);
    sendData.append("image", data.image);

    axiosUrl.post("/user", sendData).then((response)=>{
      alert('register succesfull')
      console.log(response.data);
        reset();
    }).catch((err)=>{
      console.log(err);
    })
  }

  return(
    <>
    <Nav/>
    <div className="border-2 border-green-400 h-[100vh] w-[100%] bg-red-600 ">
    <h1 className="text-6xl text-blue-400 font-bold ml-10 mt-2 mb-5" >SIGNUP FORM</h1>
      <form onSubmit={handleSubmit(unReload)}>
        <div className="mx-10 text-2xl font-thin">
        {errors.username?.message && <a style ={errorColor}> <p>{errors.username?.message}</p></a>}
        </div>
        <input type="text" {...register("username")}  name="username" className=" mt-2 border-b-2 border-blue-900 w-[80%] text-3xl  mx-10" placeholder=" UserName " />
        <div className="mx-10 text-2xl font-thin">
        {errors.email?.message && <a style ={errorColor}> <p>{errors.email?.message}</p></a>}
        </div>
        <input type="email" {...register('email')} name="email" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="Email"/>
        <div className="mx-10 text-2xl font-thin">
        {errors.password?.message && <a style ={errorColor}> <p>{errors.password?.message}</p></a>}
        </div>
        <input type="password" {...register("password")} name="password" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="Password"/>
        <div className="mx-10 text-2xl font-thin">
        {errors.confirmpassword?.message && <a style ={errorColor}> <p>{errors.confirmpassword?.message}</p></a>}
        </div>
        <input type="password" {...register('confirmpassword')} name="confirmpassword" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="Confirm Password"/>
        <input type="file" className="mx-10 mt-4 text-2xl" name="image" placeholder="profile photo" onChange={(e)=>{setValue("image", e.target.files[0])}}/>
        <button className="hover:bg-orange-600 bg-green-900  w-[70%] text-3xl  mx-10 mt-4 text-amber-50"> Signup </button>
        <Link to="/login-form">
        <button className="hover:bg-orange-600 bg-green-900  w-[70%] text-3xl text-amber-50 mx-10 mt-4"> Login </button>
        </Link>    
      </form>
      
    </div>
    </>
  )
}
export default Signup;