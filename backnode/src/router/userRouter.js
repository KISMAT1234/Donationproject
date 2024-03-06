import express from 'express'
import UserController from "../controller/UserController.js"

const userRouter = express.Router();

const routerInstance = new UserController();

userRouter.post('/', routerInstance.store)
userRouter.get('/', routerInstance.getUser)

export default userRouter;
