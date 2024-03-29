import Comment from "../model/Comment.js";

class CommentController{
     async storeComment(req,res){
        try{
        //   const {comment} = req.body
        //   console.log(comment)
        const Post_id = req.params.id
        let userId = req.user.userId
        // console.log(userId)

        console.log(Post_id);
        const userCmt = new Comment({...req.body})
        userCmt.save();
        console.log(userCmt, 'data send success')
        return res.status(200).json({data:"Comment send successfull"})
        }catch(err){
            res.status(500).json(err);
        }
     }

     async getComment(req,res){
        try{
        //   const cmt = new Comment(...req.body)
     
        const cmtData = await Comment.find()
        return res.status(200).json(cmtData);
        }
        catch(err){
            res.status(500).json(err);
        }
     }


}

export default CommentController;