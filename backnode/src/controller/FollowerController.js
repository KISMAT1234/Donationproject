import User from "../model/Userprofile.js"
import Handler from "../logger/ResponseHandler.js"
import Follow from "../model/Follow.js";
const responseInstance = new Handler();


class FollowController{
   async  getUserProfile(req,res){
    try{
        const followerId = req.params.id;
        // console.log(followerId,'follower id')
        const followingId = req.user.userId;
        // console.log(followingId,'following id')


        const user = await User.findById(followerId);
        const followUser = await User.findById(followingId);


        if (!user || !followUser) {
          return responseInstance.responseHandler(res,400,'User not found')
        }

        const existingFollow = await Follow.findOne({ follower: followerId, following: followingId });

        if(!existingFollow){
            const newFollow = new Follow({ follower: followerId, following: followingId });
            console.log(newFollow,'new follow')
            await newFollow.save();
            return responseInstance.responseHandler(res,200,'Following to user SUccessfulll')
        }else{
            await Follow.findOneAndDelete({ follower: followerId, following: followingId });
            return responseInstance.responseHandler(res,200,'unfolled to user')
        
        }

  
    }
    catch(error){

    }

   }

}

export default FollowController;