import loginRouter from "./login.js";
import userRouter from "./userRouter.js"
import upRouter from "./uploadRouter.js"
import express from 'express'

const mainRouter= express.Router();

mainRouter.use('/user',userRouter);
mainRouter.use('/login',loginRouter);
mainRouter.use('/upload',upRouter);

export default mainRouter;


