import Handler from "../logger/ResponseHandler.js"
import Search from "../model/Search.js";
import User from "../model/Userprofile.js";
const responseInstance = new Handler();

class SearchController {

    async postSearch(req,res){
        try{
            const search = req.body;
            console.log(search,"search post route")
           let userId = req.user.userId
        //    console.log(userId);
           const user = new Search({...req.body,userId: userId});
           console.log(user,'search value');
           await user.save();
           return responseInstance.responseHandler(res, 200,"search data send  successfully");
        }
        catch(err){
           console.log(err,'error in inserting search data')
           return responseInstance.responseHandler(res,500,'failed to fetch search data')
        }
    }

    async getSearch(req,res){
        try{
            // console.log("search post route")
            let ownerId = req.user.userId
            // console.log(ownerId,'owner-id')
            const searchData = await Search.find({userId:ownerId }).sort({ createdAt: -1 })
            // console.log(searchData,'search-history data');
            return responseInstance.responseHandler(res, 200,"search data fetched  successfully",searchData);
            
        }
        catch(err){
            console.log(err,'error in fetching data')
            return responseInstance.responseHandler(res, 500,"server side error");
        }
    }

    async getOnTimeSearch(req,res){
            try{
                let searchQuery = req.params.value
                console.log(searchQuery,"search post route")
                const regex = new RegExp(searchQuery, 'i');
                const searchData = await User.find({ username: regex })
                console.log(searchData,'fetched data');
                return responseInstance.responseHandler(res, 200,"search data fetched  successfully",searchData);
                
            }
            catch(err){
                console.log(err,'error in fetching data')
                return responseInstance.responseHandler(res, 500,"server side error");
            }
    }
    async deleteSearch(req,res){
        try{
            console.log('came delete req ')
            let searchId = req.params.id;
            console.log(searchId,'id delete search')
            let userId = req.user.userId
            let searchDeletion = await Search.findOneAndDelete({_id:searchId})
            console.log(searchDeletion,'----')
            return responseInstance.responseHandler(res, 200,"deletion successfull");
        }
        catch(err){
           console.log(err,'error in deleting data')
           return responseInstance.responseHandler(res, 500,"server side error");

        }
    }

}

export default SearchController;