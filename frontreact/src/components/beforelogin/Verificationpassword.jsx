
import Nav from "./Navbar"
import axiosUrl from "../url/Axiosurl";
import React,{useState} from "react";

const Verificationpassword = () => {
    const [email,setEmail] = useState('');

    const submitEmail = (e) => {
        e.preventDefault();
    }
    return (
        <>
          <form onSubmit={submitEmail}>
            <input type="email" className="bg-green-400"/>
            <button type="submit">Submit</button>
          </form>

          <h1>Please enter your email to change password</h1>
        </>
    )
}

export default Verificationpassword ;