import Upload from "../model/Upload.js";
import User from "../model/Userprofile.js";

class UploadController{

    
    async insert(req,res){
        try{
            
                let imageName="";
                if(req.file){
                    imageName= req.file.filename;
                }
                let userId = req.user.userId
                // console.log(userId,'get id');
                const user =new Upload({...req.body,image:imageName, userId:userId})
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
            const uploads =  await Upload.find()   // Fetching upload post   
            const uploadsWithUser = await Promise.all(uploads.map(async (upload) => {  // mapping over uploads inside Promise.all  to ensure all user queries are completed before continuing
                const user = await User.findById(upload.userId); // Fetching  user information  which user is going to post
                upload = {...upload.toJSON()}  //converting mongoose document into a plain Javascript object
                // console.log(upload);
                upload.userId = user   //Assign user information in userId
                
                return upload;
            }));
             return res.status(201).json(uploadsWithUser)
        }catch(err){
              return res.status(500).json(err)
        } 
    }


    async donate(req,res){
        try{
         const info = await Upload.findById(req.params.id).populate("userId")
        //  console.log(info);
        res.status(200).json(info)
        }catch(err){
        res.status(500).json(err);
        }
    }
}

export default  UploadController;
