import User from "../model/Userprofile.js";
import ResponseHandler from "../helper/ResponseHandler.js"
import sendEmail from "../helper/sendEmail.js"
const responseInstance = new ResponseHandler();
import emailToken from "../helper/emailToken.js"



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
           
            //  console.log(user)
            //  return res.status(201).json(users)
             return responseInstance.successResponse(res,200,'data fetch success',user)
            }
            else{
                const user =  await User.find({});
                // console.log(user);
                return responseInstance.successResponse(res,200,'data fetch success',user)
            }
        }catch(err){
              return res.status(500).json(err)
        } 
    }
    
    async store(req,res){
        try{
            // console.log(req.file,'image file');
            let imageName="";
            if(req.file){
                imageName= req.file.filename;
            }
            // console.log(imageName,'image filename store')
                const user = new User({...req.body, image:imageName}); 
                
                // console.log(req.body);
                // await user.save();
                // console.log(user)
                const email = user.email
                // console.log(email);
                if(user){
                    // this.sendTokenVerifyMail({subject:'Signup Verification'})
                    let value = emailToken.token({email,subject:'Signup Verification',info:user})
                }else{
                    console.log("error");
                }
                return res.status(201).json({message:'Signup Successfull'});
            }
            catch(err){
                 return res.status(500).json(err);
            }
    }

    async sendTokenVerifyMail({subject}){
        console.log({subject},'all data')
        // const token = await info.generateToken();
        // console.log(token,'verify token')
        // await sendMail({to:email,subject:subject,token})
       
      }
}

export default UserController;