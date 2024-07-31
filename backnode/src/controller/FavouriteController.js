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
             return responseInstance.responseHandler(res,200,'Added to favourite success')
         }
        }catch(err){
            console.log(err)
            return responseInstance.responseHandler(res,500,'Backend server error')

        }
    }

    async getFavouritesById(req,res){
        try{
            const userId = req.user.userId;
            const allFavouriteModelData = await Favourite.find({userId});

            if(!favs){
                return responseInstance.responseHandler(res,200,'No favourites Id found')
            }

            return responseInstance.responseHandler(res,200,'Favourites',allFavouriteModelData)
        }
        catch(err){
            console.log(err)
            return responseInstance.responseHandler(res,500,'Backend server error')

        }
    }

    async getFavouritesDataOfUser(req,res){
        try{
            const userId = req.user.userId;
            const favouriteListData = await Favourite.find({userId: userId})
            console.log(favouriteListData,'favourite list data')

            if(!favouriteListData){
                return responseInstance.responseHandler(res,200,'there is no any favourite post  data',)
            }

            return responseInstance.responseHandler(res,200,'Favourites data', favouriteListData)
        }
        catch(err){
          console.log(err)
        }
    }




}

export default FavouriteController;