import User from "../model/Userprofile.js"
import Handler from "../logger/ResponseHandler.js"
const responseInstance = new Handler();

class FollowController{
   async  getUserProfile(req,res){
    try{
        const followId = req.params.id;
        const userId = req.user.id;
    }
    catch(error){

    }

   }

}

export default FollowController;