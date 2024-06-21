import Message from "../model/Message.js";

class MessageController {
    async sendMessage(req, res) {
        const newMessage = new Message(req.body);

        try {
          const savedMessage = await newMessage.save();
          res.status(200).json(savedMessage);
        } catch (err) {
          res.status(500).json(err);
        }
    }
}
export default MessageController;