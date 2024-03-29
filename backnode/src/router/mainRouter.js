import express from 'express'
import userRouter from "./userRouter.js"
import uploadRouter from "./uploadRouter.js"
import loginRouter from "./loginRouter.js"
import cmtRouter from "./commentRouter.js";

const mainRouter= express.Router();

mainRouter.use('/user',userRouter);
mainRouter.use('/upload',uploadRouter);
mainRouter.use('/login',loginRouter);
mainRouter.use('/comment',cmtRouter)


export default mainRouter;


