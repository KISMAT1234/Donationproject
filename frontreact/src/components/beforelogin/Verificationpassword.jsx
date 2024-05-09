
import axiosUrl from "../url/Axiosurl";
import React,{useState} from "react";

const Verificationpassword = () => {
    const [email,setEmail] = useState('');
    
    const handleChange = (e) => {
      setEmail(e.target.value)
    }

    const submitEmail = (e) => {
        e.preventDefault();
        console.log(email,'email')
        axiosUrl.post("/login/forgot",{email}).then((response)=>{
          console.log(response);
        }).catch((err)=>{
          console.log(err);
        })
    }
    return (
        <>
          <form onSubmit={submitEmail}>
            <input type="email" className="bg-green-400" onChange={ handleChange}/>
            <button type="submit">Submit</button>
          </form>

          <h1>Please enter your email to change password</h1>
        </>
    )
}

export default Verificationpassword ;