import User from "../model/Userprofile.js";
import Post from "../model/Post.js";
import sendEmail from "../helper/sendEmail.js"
import emailToken from "../helper/emailToken.js"
import Token from "../model/Token.js";
import Handler from "../logger/ResponseHandler.js"
const responseInstance = new Handler();
import bcrypt from "bcrypt"
import slugify from'slugify';
import Follow from "../model/Follow.js";

class UserController{
    async getOneUser(req,res){
        try{
            const paramId = req.params?.id;
            // console.log(paramId);
            const ownerId = req.user.userId
            let user =  await User.findById(paramId).select('-password')
            //  console.log(user,'user single')
            if (!user) {
                return responseInstance.responseHandler(res,400,'User not found')
            }
            const userId = user._id.toString()
            // console.log(userId,'id')
            if(ownerId !== userId){
                 user.profileViews ++
                await user.save()
            }
            // console.log(user,'user after profile views');
             const post =  await Post.find({ userId}).select('-password')
            //  console.log(post,'user post')
             
             let  isFollowed = await Follow.findOne({following:ownerId, follower:userId})
            //  console.log(isFollowed,'user follow')
            
            let  userInformation = { post, user, isFollowed: !!isFollowed}
          
             return responseInstance.responseHandler(res,200,'data fetch success',userInformation)

        }catch(err){
            return responseInstance.responseHandler(res,500,'failed to fetch user')
        } 
    }

    async getAllUser(req,res){
        try{
            // let {userRole} = req.user 
            const ownerId = req.user.userId
             const user =  await User.find({ _id: { $ne: ownerId } }).select('-password');
            if(user){
            //  console.log(user)
            //  return res.status(201).json(users)
             return responseInstance.responseHandler(res,200,'data fetch success',user)
            }        
        }catch(err){
            return responseInstance.responseHandler(res,500,'failed to fetch user data')

        } 
    }
    
    // async store(req,res,next){
    //     try{
    //         // const value = await signupValidate(req.body)
    //         let imageName="";
    //         if(req.file){
    //             imageName= req.file.filename;
    //         }
    //             const user = new User({...req.body, image:imageName}); 
    //             user.slug = slugify(user.username, { lower: true });
    //             console.log(user);
    //             await user.save();
    //             const email = user.email
    //             const userId = user._id;
    //             if(user){
    //                 let value = emailToken.token({
    //                     email,
    //                     userId,
    //                     reason:'verify',
    //                     title:'Verify Account',
    //                     subject:'Link to verify your account',
    //                     info:user,
    //                     template:'signupMessage'
    //                 })
    //             }else{
    //                 return responseInstance.responseHandler(res,501,'User not found')
    //             }
    //             return responseInstance.responseHandler(res,200,'Email sent to your account for verification')
    //         }
    //         catch(err){
    //              return res.status(500).json(err);
    //              next(err);
    //         }
    // }

    async UpdateUserProfile(req, res){
        try{
        // const user_id = req.user.userId;
        const slug = req.params.slug;
        // console.log(slug,'user slug')
       
        const user = await User.findOne({ slug: slug});
        console.log(user,'user value')

        let updateUser = req.body;
        // console.log(updateUser,'user update')
        
        if(slug == user.slug){
           const update = await User.findOneAndUpdate({slug: slug}, updateUser)
           update.slug = slugify(update.username, { lower: true })
        //    console.log(update,'update successfull');
           return responseInstance.responseHandler(res,200,'update successfull')
        }

        } catch(err){
            return responseInstance.responseHandler(res,501,'Failed to update')
        }
    }

    async verifyEmail(req,res){
       try{
         const user_id = req.params.id;
        //  console.log(user_id,'params userid')
         const user = await User.findById({_id: user_id});
        //  console.log(user,'user id')
         if(!user){
           return responseInstance.responseHandler(res,500,'Invalid user')
            
         }
         const token = await Token.findOne({
            userId: user_id,
            token:req.params.token
         })
        //  console.log(token,'token users data')
         if(!token){
            return responseInstance.responseHandler(res,500,'Invalid token')

         }

         const update = await User.updateOne({ _id: user_id }, { $set: { isVerified: true } });
        //  console.log(update,'update successfull user data')

         await Token.deleteOne({
            userId: user_id,
            token: req.params.token
          });

         return responseInstance.responseHandler(res,200,'Email verified successfully')

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
            return responseInstance.responseHandler(res,200,'password change successfully')
        }

        await Token.deleteOne({
            userId: user_id,
            token: token
          });
        
        }catch(err){
         console.log(err)
        }
    }

    async changePassword(req,res){
        try{
            console.log('came here')
          const data = req.body
          const prevValue= data.previouspassword
          const newValue= data.newpassword
          console.log(prevValue,'password value')

          const user_id = req.user.userId
          console.log(user_id,'password')

          const user = await User.findById(user_id);
          console.log(user,'user data')

          if (!user) {
            return responseInstance.responseHandler(res,400,'User not found')
          }

          const isMatch = await user.comparePassword(prevValue);
          console.log(isMatch,'matching old and new password')


          if (!isMatch){
            return responseInstance.responseHandler(res,400,'Your previous password does not match')
          }

          const hashedPassword = await bcrypt.hash(newValue, 10);
          console.log(hashedPassword,'hash pass');

          user.password = hashedPassword;
          await user.save();

          return responseInstance.responseHandler(res,200,'Password change successfully')
        }
        catch(err){
            console.log(err)
        }
    }


}

export default UserController;