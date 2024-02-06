import Nav from "./Navbar"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosUrl from "../url/Axiosurl";
import {Link} from "react-router-dom";


const Signupschema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  }).required();

function Login(){

    const { register,setError,reset, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(Signupschema),
      });
      
      const errorColor = {
        color:"white"
      }
    
      const unReload = (data) => {
        axiosUrl.post("/login", data).then((response)=>{
          if(response.data.notfound){
            setError("email", {type: "manual", message: response.data.notfound});
          }
          else if(response.data.incorrect){
              setError("password", {type: "manual", message: response.data.incorrect});
          } 
          else{
                localStorage.setItem("token", response.data.token);
               reset();
               window.location.href="/Mainpage";
           }
         }).catch((err)=>{
          console.log(err);
        })

      }
    return (
        <>
        <Nav/>
        <form onSubmit={handleSubmit(unReload)}>
            <div className="border-4 border-red-400 w-[90%] h-[90vh] mx-[10px] my-[20px] rounded-2xl bg-yellow-300">
               <h1 className="text-center text-6xl font-bold">Login Form</h1><br></br>
               <label htmlFor="email" className="text-2xl md:text-4xl mx-[2%] ">Email: 
               {errors.email?.message && <a style ={errorColor}> {errors.email?.message}</a>}
               </label><br></br>
               <input type="email" name="email" {...register("email")} className="h-[7vh] w-[70%] rounded-xl text-2xl mx-[2%] my-[2%]"/><br></br>
               <label htmlFor="password" className="text-2xl md:text-4xl mx-[2%] my-[]">Password:
               {errors.password?.message && <a style ={errorColor}> {errors.password?.message}</a>}
               </label><br></br>
               <input type="password" {...register("password")} name="password" className="h-[7vh] w-[70%] rounded-xl text-2xl mx-[2%] my-[2px]"/><br></br>
               <button className="border-4 border-orange-600 h-[10vh] w-[70%] mx-[2%] mt-[4%] text-4xl  rounded-4xl hover:bg-orange-600">Login</button>
               <Link to="/signup-form">
               <button className="border-4 border-orange-600 h-[10vh] w-[70%] mx-[2%] mt-[2%] text-4xl  rounded-4xl hover:bg-orange-600">Signup</button>
               </Link>
            </div>
        </form>
        </>
    )
}

export default Login;