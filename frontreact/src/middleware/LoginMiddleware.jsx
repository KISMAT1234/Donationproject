import {Outlet} from "react-router-dom"

function LoginMiddleware(){
    let isLogin=true;
    
    if(isLogin){
        return(
            
             <Outlet/>
            
        );
    } else{
        window.location.href="/";
    }
}
export default LoginMiddleware;