import User from "../model/User.js";

class UserController{

    async index(req,res){
            const data=[{
                "username":"admin",
                "email":"admin@gmail.com",
                "password":'123456'
            }]
            return res.status(200).json(data);
        }
    
    async store(req,res){
        try{
            const user = new User(req.body);
            await user.save();
            return res.status(201).json(user);
        }catch(err){
            return res.status(500).json(err);
        }
    }
}

export default UserController;