import Message from "../model/Message.js";
import Handler from "../logger/ResponseHandler.js"
const responseInstance = new Handler();

class MessageController {
    async sendMessage(req, res) {
        const newMessage = new Message(req.body);
        console.log(newMessage);
        try {
          const savedMessage = await newMessage.save();
          return responseInstance.responseHandler(res,200,'Message saved successfully');

        } catch (err) {
            return responseInstance.responseHandler(res,500,'Error in backend')

        }
    }

    async fetchMessage(req,res){
        try{
            const userId = req.user.userId
            const messageId = req.params.id
            console.log(messageId,'params id')

            const [senderMessages, receiverMessages] = await Promise.all([
                Message.find({ senderId: userId, receiverId: messageId }),
                Message.find({ senderId: messageId, receiverId: userId })
              ]);
          
              // Combine both sender and receiver messages into one array
              const messages = [ ...receiverMessages,...senderMessages];

              messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

            if(!messages){
               return responseInstance.responseHandler(res,400,'Message not found');     
            }
            return responseInstance.responseHandler(res,200,'Message send Successfully',{messages});

        }
        catch(err){
          console.log(err)
          return responseInstance.responseHandler(res,500,'Backend server error');     
        }
    }
}
export default MessageController;