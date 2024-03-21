import User from "../model/Userprofile.js";
import TokenCheck from "../middleware/TokenVerify.js";

 class LoginController {

    async login(req,res){
        try{
             const {email,password} = req.body
            //  console.log(req.body);
             let mail = await User.findOne({email: email})
             if(!mail){
                return res.status(200).json({notfound:"user not found"});
             }
             let isPass = await mail.comparePassword(password)
             if(!isPass){
               return res.status(200).json({notfound:"Password not found"})
             }
             let userToken = mail.generateToken(); 
             res.status(200).json({token: userToken});
        }
        catch(err){
            res.status(200).json(err);
        }
    }
    
    async tokenCheck(req,res){
      try{
           let token = req.headers.authorization
           token = token.split(' ')[1];
           if(token){
            let response = TokenCheck.verifyToken(token);
            if(response){
                return res.status(200).json({
                    success: true
                });
            }else{
                return res.status(200).json({
                    error: "Token is not valid"
                });
            }
        }else{
            return res.status(200).json({
                error: "No token found"
            });
        }
      }
      catch(err){
         
      }
    }
 }

   

 export default LoginController;