import express from 'express'
import CommentController from '../controller/CommentController.js';
import authenticate from '../middleware/Authenticate.js';

const cmtRouter = express.Router()

const commentInstance = new CommentController();

cmtRouter.post("/:id",authenticate, commentInstance.storeComment)
cmtRouter.get("/:id", commentInstance.getComment)
cmtRouter.post("/like/",authenticate,commentInstance.postLike)
cmtRouter.get("/dislike/",authenticate,commentInstance.getLike)

export default cmtRouter;