import User from "../model/Userprofile.js";

 class LoginController {

    async login(req,res){
        try{
             const {email,password} = req.body
             console.log(req.body);
             let mail = await User.findOne({email: email})
             if(!mail){
                res.status(200).json({notfound:"user not found"});
             }
             let isPass = await mail.comparePassword(password)
             console.log(isPass);
             if(!isPass){
                res.status(200).json({notfound:"Password not found"})
             }
             let userToken = mail.generateToken(); 
             res.status(200).json({token: userToken});
        }
        catch(err){
            res.status(200).json(err);
        }
    }
 }

 export default LoginController;