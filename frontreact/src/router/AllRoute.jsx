import HomePage from "../components/Home"
import Nav from "../reuseable/Navbar"
// import Login from "../components/Login"
import Signup from "../components/Signup"


function RouterList(){
   return (
      <>
      {/* <Routes>
         <Route path="/home-page" element={<HomePage/>}/>
         
      </Routes> */}
    <Nav/>
    <HomePage/>
    {/* <Login/> */}
    <Signup/>
    </>

   )
}
export default RouterList;

