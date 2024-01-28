import HomePage from "../components/beforelogin/Home"
import {Routes, Route} from "react-router-dom"
import AboutPage from "../components/beforelogin/About"
import Achievement from "../components/beforelogin/Achievement"
import Event from "../components/beforelogin/Event"
import Contact from "../components/beforelogin/Contact"
// import Login from "../components/Login"
// import Signup from "../components/beforelogin/Signup"
// import Post from "../components/afterlogin/Post"


function RouterList(){
   return (
      <>
      <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/about-page" element={<AboutPage/>}/>
         <Route path="/achievement" element={<Achievement/>}/>
         <Route path="/event" element={<Event/>}/>
         <Route path="/contact" element={<Contact/>}/>
       </Routes>
  

    </>

   )
}
export default RouterList;

