import express from 'express'
import UserController from "../controller/UserController.js"

const userRouter = express.Router();

const routerInstance = new UserController();

userRouter.get('/',routerInstance.index)



export default userRouter;
