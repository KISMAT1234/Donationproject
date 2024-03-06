import User from "../model/Userprofile.js";


class UserController{
    async getUser(req,res){
        try{
             const user =  await User.find({});
             return res.status(201).json(user)
        }catch(err){
              return res.status(500).json(err)
        } 
    }
    
    async store(req,res){
        try{
                const user = new User({...req.body}); 
                await user.save();
                return res.status(201).json(data);
            }
            catch(err){
                 return res.status(500).json(err);
            }
    }
}

export default UserController;