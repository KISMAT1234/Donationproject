import Post from "../model/Post.js";
import User from "../model/Userprofile.js";
import Pagination from "../helper/Pagination.js";
import Handler from "../logger/ResponseHandler.js";
const responseInstance = new Handler();


class PostController{

    
    async insert(req,res){
        try{
            
                let imageName="";
                if(req.file){
                    imageName= req.file.filename;
                }
                let userId = req.user.userId
                // console.log(userId,'get id');
                const user =new Post({...req.body,image:imageName, userId:userId})
                // console.log(user);
                await user.save();
                //  res.send(user)
                return res.status(201).json(user);
            }
            catch(err){
                 return res.status(500).json(err);
            }
    }

    async content(req,res){
        try{
            // console.log('came here in post1')
            let { skip, size } = Pagination(req)
        
            let {name} = req.query;
            let queryObject={}
            if(name){
                queryObject.name = {$regex: name, $options:"i"};
            }
            // console.log(queryObject);
            const uploads =  await Post.find(queryObject).skip(skip).limit(size);   // Fetching upload post   
            const uploadsWithUser = await Promise.all(uploads.map(async (upload) => {  // mapping over uploads inside Promise.all  to ensure all user queries are completed before continuing
                const user = await User.findById(upload.userId); // Fetching  user information  which user is going to post
                upload = {...upload.toJSON()}  //converting mongoose document into a plain Javascript object
                // console.log(upload);
                upload.userId = user   //Assign user information in userId 
                return upload;
            }));
            // console.log(uploadsWithUser,'user data')
            //  return res.status(201).json(uploadsWithUser)
             return responseInstance.responseHandler(res, 200,"data fetch of post successfully",uploadsWithUser);
        }catch(err){
            
            console.log(err,'err');
        } 
    }


    async donate(req,res){
        try{
        //  console.log(req.params.id,'inout value')
         const info = await Post.findById(req.params.id).populate("userId")
        //  console.log(info);
        res.status(200).json(info)
        }catch(err){
        res.status(500).json(err);
        }
    }

    async deletePost(req,res){
      try{
       const userId = req.user.userId
    //    console.log(userId,'user id')
       const postId = req.params.id
    //    console.log(postId,'post id')

       if(!userId){
        return responseInstance.responseHandler(res, 400,"Ops! you are unauthorized to delete this post");
       }

       const post = await Post.findByIdAndDelete(postId)
    //    console.log(post,'post')
       if(!post){
        return responseInstance.responseHandler(res, 400,"Post not found");
       }
       
       return responseInstance.responseHandler(res, 200,"Your post has been Deleted Successfully");

    }
      catch(error){
        console.log(error,'error in server');
        return responseInstance.responseHandler(res, 400,"Internal server error");
      }
    }
}

export default  PostController;
