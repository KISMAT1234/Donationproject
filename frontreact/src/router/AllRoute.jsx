import HomePage from "../components/Home"
import Nav from "../reuseable/Navbar"
import Login from "../components/Login"


function RouterList(){
   return (
      <>
      {/* <Routes>
         <Route path="/home-page" element={<HomePage/>}/>
         
      </Routes> */}
    <Nav/>
    <HomePage/>
    <Login/>
    </>

   )
}
export default RouterList;

