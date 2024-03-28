import User from "../model/Userprofile.js";
import TokenCheck from "../middleware/TokenVerify.js";


class UserController{
    // async getUser(req,res){
    //     try{
    //         const userId = req.user.userId
    //          const user =  await User.find({_id : userId});
    //          return res.status(201).json(user)
    //     }catch(err){
    //           return res.status(500).json(err)
    //     } 
    // }

    async getAllUser(req,res){
        try{
            let {userRole} = req.user
            let userId = req.user.userId
    
            if(userRole == "user"){
             const user =  await User.findById({_id :userId});
             let users = [];
             users.push(user);
            //  console.log(users)
             return res.status(201).json(users)
            }else{
                const user =  await User.find({});
                // console.log(user);
                return res.status(201).json(user)
            }
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