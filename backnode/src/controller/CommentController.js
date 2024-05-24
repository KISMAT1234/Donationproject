import Comment from "../model/Comment.js";
import Handler from "../logger/ResponseHandler.js"
const responseInstance = new Handler();

class CommentController{
     async storeComment(req,res){
        try{
        //   const {comment} = req.body
        //   console.log(comment)
        const postId = req.params.id
        // console.log(postId, "post id");
        let userId = req.user.userId
        // console.log(userId,"user Id")

        const userCmt = new Comment({...req.body,userId:userId,postId:postId})
        await userCmt.save();
        // console.log(userCmt, 'data send success')
        return res.status(200).json({data:"Comment send successfull"})
        }catch(err){
            res.status(500).json(err);
        }
     }

     async getComment(req,res){
        try{
        //   const cmt = new Comment(...req.body)
        const Id = req.params.id
        // console.log(postId,"fetch id")
        // console.log("fetch")

 
        
        const cmtData = await Comment.find({postId: Id}).populate('userId',['username','image'])
        // console.log(cmtData,"fetch comment");
        return res.status(200).json(cmtData);
        }
        catch(err){
            res.status(500).json(err);
        }
     }

     async postLike(req,res){
        try{
           const userId = req.user.userId;
         //   console.log(userId, 'userid fetch')
         const cmtId = req.params.id
         // console.log(cmtId,'comment id');

         const cmtData = await Comment.findById(cmtId)
         console.log(cmtData,'cmt data'); 
         
         if(cmtData.likedBy.includes(userId)){
            cmtData.likedBy = cmtData.likedBy.filter((likedUserId)=>{
               return likedUserId.toString() !== userId.toString();
            })
            cmtData.like -= 1
            cmtData.likeIcon = false;
            await cmtData.save();
            return responseInstance.responseHandler(res,200,'like send successfully',cmtData)
         }
         else{
           cmtData.likedBy.push(userId);
           cmtData.like += 1;
           cmtData.likeIcon = true;
            if(cmtData.dislikeBy.includes(userId)){
              cmtData.dislikeBy = cmtData.dislikeBy.filter((dislikedUserId)=>{
                 return dislikedUserId.toString() !== userId.toString();
               })
               cmtData.dislike -= 1;
               cmtData.disLikeIcon = false; 
            }
            await cmtData.save();
         }
         console.log(cmtData,'last cmt')
         return responseInstance.responseHandler(res,200,'like save successfully',cmtData)
        }
        catch(error){
            console.log(error)
            return responseInstance.responseHandler(res,500,'server error')
        }

     }

     async postDisLike(req,res){
      try{
       const userId = req.user.userId;
       //   console.log(userId, 'userid fetch')
       const cmtId = req.params.id
       // console.log(cmtId,'comment id');

       const cmtData = await Comment.findById(cmtId)
       console.log(cmtData,'cmt data dislike');

       if(cmtData.dislikeBy.includes(userId)){
          cmtData.dislikeBy = cmtData.dislikeBy.filter((dislikedUserId)=>{
             return dislikedUserId.toString() !== userId.toString();
          })
          cmtData.dislike -= 1;
          cmtData.disLikeIcon = false;
          await cmtData.save();
         return responseInstance.responseHandler(res,200,'like save successfully',cmtData)
       }else{
         cmtData.dislikeBy.push(userId);
         cmtData.dislike += 1;
         cmtData.disLikeIcon = true;
         await cmtData.save();
         if(cmtData.likedBy.includes(userId)){
            cmtData.likedBy = cmtData.likedBy.filter((likedUserId)=>{
               return likedUserId.toString() !== userId.toString();
            })
            cmtData.like -= 1;
            cmtData.likeIcon = false;
            await cmtData.save();
         return responseInstance.responseHandler(res,200,'like save successfully',cmtData)
         }
         
       }
       console.log(cmtData,'last cmt dislike')
      }
      catch(error){
          console.log(error)
          return responseInstance.responseHandler(res,500,'server error')

      }
      }

      async getLike(req,res){
         try{
            // const cmtId = req.params.id
            const like = await Comment.findById()
            return responseInstance.responseHandler(res,200,'like save successfully',like)
         }
         catch(error){
            console.log(error)
            return responseInstance.responseHandler(res,500,'server error')
         }
      }

      async getDisLike(req,res){
         try{

         }
         catch(error){
            console.log(error)
         }
      }


}

export default CommentController;