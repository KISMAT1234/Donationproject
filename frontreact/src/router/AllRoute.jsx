// before LoginPage
import HomePage from "../components/beforelogin/Home"
import {Routes, Route} from "react-router-dom"
import AboutPage from "../components/beforelogin/About"
import Achievement from "../components/beforelogin/Achievement"
import Event from "../components/beforelogin/Event"
import Contact from "../components/beforelogin/Contact"
import Signup from "../components/beforelogin/Signup"
import Login from "../components/beforelogin/Login"
import Verify from "../middleware/emailVerify"
import Verificationpassword from "../components/beforelogin/Verificationpassword"
import Forgotpassword from "../components/beforelogin/Forgotpassword"

import LoginMiddleware from "../middleware/LoginMiddleware"

// After Login Page
import Mainpage from "../components/afterlogin/Mainpage";
import MemberList from "../components/afterlogin/Members"
import Favourites from "../components/afterlogin/Favourites"
import Uploadcontent from "../components/afterlogin/Upload"
import Donate from "../components/afterlogin/Donate"
import Profile from "../components/afterlogin/Profile"
import Search from "../components/afterlogin/Search"
import Layout from "../components/afterlogin/bar/Outlet"
import Userprofile from "../components/afterlogin/Userprofile"
import Update from "../components/afterlogin/Update"
import PaymentSuccess from "../components/afterlogin/PaymentSuccess"
import PaymentCancel from "../components/afterlogin/PaymentCancel"





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
         <Route path="/login-form/send-email" element={<Verificationpassword />}/>





         <Route path="/user/:id/verify/:token" element={<Verify/>}/>
         <Route path="/user/:id/forgot/:token" element={<Forgotpassword/>}/>

         <Route path="Mainpage" element={<LoginMiddleware/>}>
             <Route path="/Mainpage" element={<Mainpage/>}/>
             <Route path="profile" element={<Profile/>}/>
             <Route path="profile/:slug" element={<Update/>}/>
             <Route path="members-list" element={<MemberList/>}/>
             <Route path="members-list/:slug" element={<Userprofile/>}/>
             <Route path="favourites" element={<Favourites/>}/>
             <Route path="upload" element={<Uploadcontent/>}/>
             <Route path="donate/:id" element={<Donate/>}/>
             <Route path="search" element={<Search/>}/>
             <Route path="payment-success" element={<PaymentSuccess/>}/>
             <Route path="payment-cancel" element={<PaymentCancel/>}/>
            
         
         </Route>

       </Routes>
 

    </>

   )
}
export default RouterList;

