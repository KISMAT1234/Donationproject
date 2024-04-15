import User from "../model/Userprofile.js";
import sendEmail from "../helper/sendEmail.js"
import emailToken from "../helper/emailToken.js"
import Token from "../model/Token.js";
import Handler from "../helper/ResponseHandler.js"
const responseInstance = new Handler();
import bcrypt from "bcrypt"




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
                await user.save();
                // console.log(user)
                const email = user.email
                const userId = user._id;
                // console.log(email,userId,'user info');
                if(user){
                    // this.sendTokenVerifyMail({subject:'Signup Verification'})
                    let value = emailToken.token({
                        email,
                        userId,
                        reason:'verify',
                        title:'Verify Account',
                        subject:'Link to verify your account',
                        info:user,
                        template:'signupMessage'
                    })
                }else{
                    console.log("error");
                }
                return res.status(201).json({message:'Email sent to your account for verification'});
            }
            catch(err){
                 return res.status(500).json(err);
            }
    }

    async verifyEmail(req,res){
       try{
         const user_id = req.params.id;
        //  console.log(user_id,'params userid')
         const user = await User.findById({_id: user_id});
        //  console.log(user,'user id')
         if(!user){
            return res.status(400).json({message:"Invalid user"});
         }
         const token = await Token.findOne({
            userId: user_id,
            token:req.params.token
         })
        //  console.log(token,'token users data')
         if(!token){
            return res.status(400).json({message:"Invalid token"});
         }

         const update = await User.updateOne({ _id: user_id }, { $set: { isVerified: true } });
        //  console.log(update,'update successfull user data')

         await Token.deleteOne({
            userId: user_id,
            token: req.params.token
          });

         res.status(200).json({message:"Email verified successfully"})
       }catch(err){

        res.status(500).json({message:"Error in verifying email"})

       }
    }

    async forgotPassword(req,res){
        try{
        let data = req.body.password;
        // console.log(data);
        const user_id = req.params.id
        const token = req.params.token
        // console.log(user_id,'user id')
        // console.log(token,'auth email')
        const hashedPassword = await bcrypt.hash(data, 10);
        // console.log(hashedPassword,'hash pass');
        const user = await User.updateOne({_id:user_id},{ $set: { password: hashedPassword } })
        // console.log(user,'after hash')
        if(user){
            // console.log('change successfull');
            return responseInstance.successResponse(res,200,'password change successfully')
        }

        await Token.deleteOne({
            userId: user_id,
            token: token
          });
        
        }catch(err){
         console.log(err)
        }
    }


}

export default UserController;