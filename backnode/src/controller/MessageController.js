import mongoose from  'mongoose';
import Message from "../model/Message.js";
import Handler from "../logger/ResponseHandler.js"
import Conversation from '../model/Conversation.js';
const responseInstance = new Handler();
const ObjectId = mongoose.Types.ObjectId;

class MessageController {
    async sendMessage(req, res) {
      try {
        const newMessage = req.body;
        console.log(newMessage,'message rec');

        let conversation = await Conversation.findOne({
          participats: {$all: [newMessage.senderId, newMessage.receiverId]}
        })
        console.log(conversation,'conversation')

        if(!conversation){
          conversation = await Conversation.create({
            participants: [newMessage.senderId, newMessage.receiverId]
          })
        }
        console.log(conversation,'after save conversation')

        
          const saveMessage = new Message({...newMessage}); 
          console.log(saveMessage)

          if(saveMessage){
             conversation.messages.push(saveMessage._id)
          }
          console.log(saveMessage,'push after save conversation')
          console.log(conversation,'final push of id')
          // await Promise.all([conversation.save(),saveMessage.save()]);
          // return responseInstance.responseHandler(res,200,'Message saved successfully');

        } catch (err) {
            return responseInstance.responseHandler(res,500,'Error in backend')

        }
    }

    async fetchMessage(req,res){
        try{
            const userId = req.user.userId
            const messageId = req.params.id
            console.log(messageId,'params id')

            let conversation = await Conversation.findOne({
              participats: {$all: [userId, messageId]}
            }).populate("messages")

            // if (!ObjectId.isValid(userId) || !ObjectId.isValid(messageId)) {
            //   return responseInstance.responseHandler(res, 400, 'Invalid ID format');
            // }

            // const [senderMessages, receiverMessages] = await Promise.all([
            //     Message.find({ senderId: userId, receiverId: messageId }),
            //     Message.find({ senderId: messageId, receiverId: userId })
            //   ]);
          
            //   // Combine both sender and receiver messages into one array
            //   const messages = [ ...receiverMessages,...senderMessages];

            //   messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

            // if(!messages){
            //    return responseInstance.responseHandler(res,400,'Message not found');     
            // }
            // return responseInstance.responseHandler(res,200,'Message send Successfully',{messages});

        }
        catch(err){
          console.log(err)
          return responseInstance.responseHandler(res,500,'Backend server error');     
        }
    }
}
export default MessageController;