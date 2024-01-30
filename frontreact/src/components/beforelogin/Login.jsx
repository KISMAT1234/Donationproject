import Nav from "./Navbar"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Signupschema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  }).required();

function Login(){
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(Signupschema),
      });
      
      const errorColor = {
        color:"white"
      }
    
      const unReload = (e) => {
        e.preventDefault();
      }
    return (
        <>
        <Nav/>
        <form onSubmit={handleSubmit(unReload)}>
            <div className="border-4 border-red-400 w-[90%] h-[70vh] mx-[10px] my-[20px] rounded-2xl bg-green-400">
               <h1 className="text-center text-6xl">Login Form</h1><br></br>
               <label htmlFor="email" className="text-4xl mx-[10%] my-[20]">Email: 
               {errors.email?.message && <a style ={errorColor}> {errors.email?.message}</a>}
               </label><br></br>
               <input type="email" name="email" {...register("email")} className="h-[7vh] w-[70%] rounded-xl text-2xl mx-[10%] my-[2%]"/><br></br>
               <label htmlFor="password" className="text-4xl mx-[10%] my-[20]">Password:
               {errors.password?.message && <a style ={errorColor}> {errors.password?.message}</a>}
               </label><br></br>
               <input type="password" {...register("password")} name="password" className="h-[7vh] w-[70%] rounded-xl text-2xl mx-[10%] my-[2%]"/><br></br>
               <input type="checkbox" className="h-[4vh] w-[10%] rounded-xl  ml-[10%] my-[5%]"/>
               <label htmlFor="" className="text-2xl mx-[10%]" >Remember me</label><br></br>
               <button className="border-4 border-orange-600 h-[10vh] w-[70%] mx-[10%] text-4xl  rounded-4xl hover:bg-orange-600">Login</button>
            </div>
        </form>
        </>
    )
}

export default Login;