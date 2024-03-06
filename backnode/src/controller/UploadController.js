import Upload from "../model/Upload.js";

class UploadController{

    
    async insert(req,res){
        try{
                // const user = new Upload({...req.body});  
                const user =new Upload({...req.body});  
                console.log(user) 
                await user.save();
                return res.status(201).json(user);
            }
            catch(err){
                 return res.status(500).json(err);
            }
    }

    async content(req,res){
        try{
             const user =  await Upload.find({});
             return res.status(201).json(user)
        }catch(err){
              return res.status(500).json(err)
        } 
    }

}

export default  UploadController;
