import User from "../model/Userprofile.js";
import Post from "../model/Post.js";
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
                    let value =  emailToken.token({
                        email,
                        userId,
                        reason:'verify',
                        title:'Verify Account',
                        subject:'Link to verify your account',
                        info:mail,
                        template:'signupMessage'
                    })
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
           let userId = req.user.userId
           let token = req.headers.authorization
        //    console.log(token)
           token = token.split(' ')[1];
           const user = await Post.find({userId: userId}).populate("userId");
        //    console.log('user data',user);
        
           if(token){
            let response = TokenCheck.verifyToken(token);
            if(response){
                return res.status(200).json({
                    userData: user,
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

    async forgotPassword(req,res){
        try{
         let data = req.body
         data = data.email

        //  console.log(data,'email value');
         let user = await User.findOne({ email:data})
        //  console.log(user,'email')

         const email = user.email
         const userId = user._id;

         if(email){
            // console.log('email found');
            emailToken.token({
                email,
                userId,
                reason:'forgot',
                title:'Change Password',
                subject:'Link provided to change password',
                info:user,
                template:'forgotPassword'
            })
         }else{
            console.log('Email not found');
         }
        }catch(err){
            console.log(err)
        }
    }
 }

   

 export default LoginController;