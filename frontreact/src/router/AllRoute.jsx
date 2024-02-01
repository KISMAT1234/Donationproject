// before LoginPage
import HomePage from "../components/beforelogin/Home"
import {Routes, Route} from "react-router-dom"
import AboutPage from "../components/beforelogin/About"
import Achievement from "../components/beforelogin/Achievement"
import Event from "../components/beforelogin/Event"
import Contact from "../components/beforelogin/Contact"
import Signup from "../components/beforelogin/Signup"
import Login from "../components/beforelogin/Login"


import LoginMiddleware from "../middleware/LoginMiddleware"

// After Login Page
import Mainpage from "../components/afterlogin/Mainpage";
import MemberList from "../components/afterlogin/Members"
import Uploadcontent from "../components/afterlogin/Upload"





function RouterList(){
   return (
      <>
      <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/about-page" element={<AboutPage/>}/>
         <Route path="/achievement" element={<Achievement/>}/>
         <Route path="/event" element={<Event/>}/>
         <Route path="/contact" element={<Contact/>}/>


         <Route path="/signup-form" element={<Signup/>}/>
         <Route path="/login-form" element={<Login/>}/>


         <Route path="upload" element={<Uploadcontent/>}/>

         <Route path="Mainpage" element={<LoginMiddleware/>}>

             <Route path="/Mainpage" element={<Mainpage/>}/>
             <Route path="members-list" element={<MemberList/>}/>

         </Route>

       </Routes>
 

    </>

   )
}
export default RouterList;

