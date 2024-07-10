import Favourite from "../model/Favourite.js";
import Handler from "../logger/ResponseHandler.js"
const responseInstance = new Handler();


class FavouriteController {
    async addToCart(req,res){
        try{
         const userId = req.user.userId;
         const postId = req.params.id;

         const favourite = await Favourite.findOne({postId});
         console.log(favourite,'checking favourite ')
         if (favourite) {
             const data = await Favourite.findByIdAndDelete(favourite._id);
             console.log(data,'delete favourite data')
             return responseInstance.responseHandler(res,200,'Remove from favourites success')
         }else{
             const fav = new Favourite({ postId:postId, userId:userId });
             console.log(fav,'fav value')
             await fav.save();
            //  return responseInstance.responseHandler(res,200,'Added to favourite success')
         }
        }catch(err){
            console.log(err)
            return responseInstance.responseHandler(res,500,'Backend server error')

        }
    }


}

export default FavouriteController;