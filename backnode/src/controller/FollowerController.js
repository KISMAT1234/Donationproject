import User from "../model/Userprofile"

class SubscribeController{
   async  getUserChannelProfile(req,res){
    try{
     const {username} = req.params

     const channel = await User.aggregate([
        {
            $match:{
                username: username?.toLowerCase()
            }
        },
        {
            $lookup:{
                from: "Follow",
                localfield:"_id",
                foreignField:"follower",
                as:"followers"
            }
        },
        {
            $lookup:{
                from: "Follow",
                localfield:"_id",
                foreignField:"following",
                as:"followedTo"
            }
        },
        {
            $addFields: {
                followerCount:{
                    $size:"followers"
                },
                followingCount:{
                    $size:"followedTo"
                },
                isFollowed:{
                    $cond:{
                        if:{$in: [req.user?._id,"$follower.follower"]}
                    }
                }
            }
        },
        {
            $project:{
                fullName: 1,
                username: 1,
                followerCount: 1,
                followingCount: 1,
                isFollowed: 1,
                
            }
        }

     ])

     if(!channel?.length){
        console.log("Channel not found");
     }
    }catch(err){
        console.log(err)
    }
   }
}