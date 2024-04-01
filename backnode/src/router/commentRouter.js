import express from 'express'
import CommentController from '../controller/CommentController.js';
import authenticate from '../middleware/Authenticate.js';

const cmtRouter = express.Router()

const commentInstance = new CommentController();

cmtRouter.post("/:id",authenticate, commentInstance.storeComment)
cmtRouter.get("/:id", commentInstance.getComment)

export default cmtRouter;