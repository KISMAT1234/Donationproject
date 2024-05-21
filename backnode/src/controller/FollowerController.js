import User from "../model/Userprofile.js"

class FollowController{
   async  getUserProfile(req,res){
    try{
        const followerId = req.user.userId;
        const followingId = req.params.id;
        const user = new User({follower:followerId, following:followingId});
        let following = user.following;
        
        following.push(user._id);

     const people = await User.find({_id: {$nin:following}})

    //  const {username} = req.params

    //  const channel = await User.aggregate([
    //     {
    //         $match:{
    //             username: username?.toLowerCase()
    //         }
    //     },
    //     {
    //         $lookup:{
    //             from: "Follow",
    //             localfield:"_id",
    //             foreignField:"follower",
    //             as:"followers"
    //         }
    //     },
    //     {
    //         $lookup:{
    //             from: "Follow",
    //             localfield:"_id",
    //             foreignField:"following",
    //             as:"followedTo"
    //         }
    //     },
    //     {
    //         $addFields: {
    //             followerCount:{
    //                 $size:"followers"
    //             },
    //             followingCount:{
    //                 $size:"followedTo"
    //             },
    //             isFollowed:{
    //                 $cond:{
    //                     if:{$in: [req.user?._id,"$follower.follower"]}
    //                 }
    //             }
    //         }
    //     },
    //     {
    //         $project:{
    //             fullName: 1,
    //             username: 1,
    //             followerCount: 1,
    //             followingCount: 1,
    //             isFollowed: 1,
    //             email: 1
                
    //         }
    //     }

    //  ])

    //  if(!channel?.length){
    //     console.log("Channel not found");
    //  }

    }catch(err){
        console.log(err)
    }

   }

}

export default FollowController;