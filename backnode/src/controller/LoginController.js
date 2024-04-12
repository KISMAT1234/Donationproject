import User from "../model/Userprofile.js";
import TokenCheck from "../middleware/TokenVerify.js";
import Token from "../model/Token.js";
import emailToken from "../helper/emailToken.js"


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

             if(!mail.isVerified){
                let userId = mail._id
                // console.log(userId,'mail id');

                let token = await Token.findOne({userId: userId})
                //  console.log(token, 'token value')
                 if(!token){
                    let value = emailToken.token({email,userId,subject:'Signup Verification',info:mail})
                 }
                 return res.status(200).json({notfound:"Please verify your email"})
             }

             let userToken = mail.generateToken();
            //  console.log(userToken); 
             res.status(200).json({token: userToken});
        }
        catch(err){
            res.status(200).json(err);
        }
    }
    
    async tokenCheck(req,res){
      try{
           let token = req.headers.authorization
        //    console.log(token)
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