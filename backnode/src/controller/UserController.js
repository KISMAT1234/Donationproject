import User from "../model/User.js";

class UserController{

    async index(req,res){
           const data= await User.find({});
            return res.status(200).json(data);
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

    async login(req,res){
        try{
         

            
        }catch(err){
           return  res.send.status(200).json(err)
        }
    }
}

export default UserController;