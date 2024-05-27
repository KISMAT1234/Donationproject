import express from 'express'
import CommentController from '../controller/CommentController.js';
import authenticate from '../middleware/Authenticate.js';

const cmtRouter = express.Router()

const commentInstance = new CommentController();

cmtRouter.post("/:id",authenticate, commentInstance.storeComment)
cmtRouter.get("/:id", commentInstance.getComment)
cmtRouter.post("/like/:id",authenticate,commentInstance.postLike)
cmtRouter.post("/dislike/:id",authenticate,commentInstance.postDisLike)
cmtRouter.get("/getLike",commentInstance.getLike)
cmtRouter.get("/getDisLike/:id",commentInstance.postDisLike)
// cmtRouter.get("/dislike/:id",authenticate,commentInstance.getLike)
cmtRouter.delete("/:id", commentInstance.deleteComment)


export default cmtRouter;