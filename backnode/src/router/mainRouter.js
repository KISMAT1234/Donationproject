import loginRouter from "./login.js";
import userRouter from "./userRouter.js"
import express from 'express'

const mainRouter= express.Router();

mainRouter.use('/user',userRouter);
mainRouter.use('/login',loginRouter);

export default mainRouter;


