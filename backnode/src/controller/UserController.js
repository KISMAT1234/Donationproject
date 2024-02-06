import User from "../model/Userprofile.js";
import TokenVerify from "../middleware/TokenVerify.js";


class UserController{

    async index(req,res){
        let token = req.headers.authorization;
        if(token){
            token = token.split(' ')[1];
            let response = TokenVerify.verifyToken(token);
            if(response){
                let role = response.role;
                if(role === "admin"){
                    let users = await User.find({});
                    return res.status(200).json(users);
                }else{
                    let user = await User.findById(response.id);
                  
                    return res.status(200).json(user);
                }
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
    
    async store(req,res){
        try{
                let imageName="";
                if(req.file){
                    imageName = req.file.filename;
                }
                const user = new User({...req.body,image:imageName});      
                const data= await user.save();
                return res.status(201).json(data);
            }
            catch(err){
                 return res.status(500).json(err);
            }
    }

    async loginuser(req, res){
        let token = req.headers.authorization;
        token = token.split(' ')[1];
        if(token){
            let response = TokenVerify.verifyToken(token);
            if(response){
               let user = await User.findById(response.id);
               return res.status(200).json(user);
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
}

export default UserController;