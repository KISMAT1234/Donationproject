import Notification from "../model/Notification.js";
import Handler from "../logger/ResponseHandler.js"
const responseInstance = new Handler();

class NotificationController {
    async getNotification(req, res) {
        try{
         const userId = req.user.userId;
         const notification = await Notification.find({sender: userId})
         console.log(notification,'getting user notification')

         if(notification){
            return responseInstance.responseHandler(res,200,'Notification fetched successfull',notification)
         }else{
            return responseInstance.responseHandler(res,400,'there is no any notification')
         }
        }
        catch(err){
            console.log(err)
        }
    }
}
export default NotificationController;