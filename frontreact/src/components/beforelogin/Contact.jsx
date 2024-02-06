import Nav from "./Navbar"
import React from 'react'

function Contact(){
    return <>
       <Nav/>
       <div>
            <div className="bg-blue-300 h-[30vh] ">
                <h1 className="text-center text-4xl font-thin text-slate-800 pt-14" >How can we help?</h1>
                <h1 className="text-center text-4xl font-thin text-slate-800 " >Send us a message</h1>
            </div>
            <div className="bg-gray-300 px-4 py-4 md:flex justify-between">
                <div className=" md:ml-20">
                    <form> 
                         <h1 >First Name:</h1>
                         <input type="text" className="w-[100%] "/>
                         <h1 className="mt-1">Last Name:</h1>
                         <input type="text" className="w-[100%] "/>
                         <h1 lassName="mt-1">Email:</h1>
                         <input type="text" className="w-[100%] "/>
                         <h1 lassName="mt-1">Message:</h1>
                         <input type="text" className="w-[100%] h-[20vh]"/>
                         <button className="bg-orange-500 mt-5">Send Message</button>
                    </form>  
                </div>
                    
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7991455.001489926!2d78.35555643208062!3d28.365237154508204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995e8c77d2e68cf%3A0x34a29abcd0cc86de!2sNepal!5e0!3m2!1sen!2snp!4v1707126794175!5m2!1sen!2snp" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <h1>kathmandu-4,Koteshowr</h1>
                    <h1>Nepal</h1>
                    <h1>admin123@gmail.com</h1>
                </div>
            </div>
       </div>
       
    </>
}

export default Contact ;