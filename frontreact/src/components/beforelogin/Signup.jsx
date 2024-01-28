import Nav from "./Navbar"
function Signup(){
  return(
    <>
    <Nav/>
    <div className="border-2 border-green-400 h-[80vh] w-[80%] bg-red-600 ">
      <form>
        <input type=""  className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="First Name"/><br></br><br></br>
        <input type=""  className=" border-b-2 border-blue-900 w-[80%] text-3xl  mx-10" placeholder="Last Name" />
        <input type="email" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="Email"/>
        <input type="password" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="Password"/>
        <input type="password" className=" border-b-2 border-blue-600 w-[80%] text-3xl  mx-10 mt-4" placeholder="Confirm Password"/>
        <button className="hover:bg-orange-600 bg-green-900  w-[70%] text-3xl  mx-10 mt-4 text-amber-50"> Signup </button>
        <button className="hover:bg-orange-600 bg-green-900  w-[70%] text-3xl text-amber-50 mx-10 mt-4"> Login </button>
    
        
      </form>
      
    </div>
    </>
  )
}
export default Signup;