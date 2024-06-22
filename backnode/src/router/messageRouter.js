import express from 'express'
import MessageController from "../controller/MessageController.js"
import authenticate from "../middleware/Authenticate.js"
const messageInstance = new MessageController();

const messageRouter = express.Router();
messageRouter.post('/',messageInstance.sendMessage)
messageRouter.get('/:id',authenticate,messageInstance.fetchMessage)

export default messageRouter;
