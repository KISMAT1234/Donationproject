import Message from "../model/Message.js";
import Handler from "../logger/ResponseHandler.js"
const responseInstance = new Handler();

class MessageController {
    async sendMessage(req, res) {
        const newMessage = new Message(req.body);

        try {
          const savedMessage = await newMessage.save();
          return responseInstance.responseHandler(res,200,'Message saved successfully');

        } catch (err) {
            return responseInstance.responseHandler(res,500,'Error in backend')

        }
    }

    async fetchMessage(req,res){
        try{
            const messageId = req.params.messageId
            const messages = await Message.find()

            if(!messages){
               return responseInstance.responseHandler(res,400,'Message not found');     
            }
            return responseInstance.responseHandler(res,200,'Message send Successfully',messages);

        }
        catch(err){

        }
    }
}
export default MessageController;