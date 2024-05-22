import Comment from "../model/Comment.js";

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
            await cmtData.save();
         }else{
           cmtData.likedBy.push(userId);
           await cmtData.save();
         }
         console.log(cmtData,'last cmt')

         

        }
        catch(error){
            console.log(error)
        }
     }

     async getLike(req,res){
        try{
  
        }
        catch(error){
              console.log(error)
        }
       }


}

export default CommentController;