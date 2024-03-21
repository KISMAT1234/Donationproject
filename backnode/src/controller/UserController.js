import User from "../model/Userprofile.js";
import TokenCheck from "../middleware/TokenVerify.js";


class UserController{
    async getUser(req,res){
        try{
            let token = req.headers.authorization;
            token = token.split(' ')[1];
            // console.log(token);
            if(token){
                let response = TokenCheck.verifyToken(token);
                // console.log(response);
                if(response){
                    let answer = response.role
                    console.log(answer)
                }
            }
             const user =  await User.find({});
             return res.status(201).json(user)
        }catch(err){
              return res.status(500).json(err)
        } 
    }
    
    async store(req,res){
        try{
            let imageName="";
            if(req.file){
                imageName= req.file.filename;
            }
                const user = new User({...req.body, image:imageName}); 
                // console.log(req.body);
                await user.save();
                // console.log(user);
                return res.status(201).json({message:'Signup Successfull'});
            }
            catch(err){
                 return res.status(500).json(err);
            }
    }
}

export default UserController;