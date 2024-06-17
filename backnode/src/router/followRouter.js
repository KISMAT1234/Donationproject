import express from 'express';
import FollowController from "../controller/FollowerController.js"
import authenticate from "../middleware/Authenticate.js"



const followRouter = express.Router();
const followInstance = new FollowController();


followRouter.post("/:id",authenticate,followInstance.getUserProfile)

export default followRouter;